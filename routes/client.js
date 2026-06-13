const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const { isDemoMode } = require("../config/demo");
const demoStore = require("../mock/store");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter vaild Email").isEmail(),
    check("password", "Password should be at least 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { name, email, password } = req.body;

    try {
      if (isDemoMode()) {
        if (demoStore.findUserByEmail(email)) {
          return res.status(400).json({ msg: "user already exist !" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = demoStore.createUser({ name, email, password: hashedPassword });
        const payload = { user: { id: user.id } };
        return jwttoken.sign(payload, config.get("jwtsecret"), { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user already exist !" });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = { user: { id: user.id } };
      jwttoken.sign(payload, config.get("jwtsecret"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
