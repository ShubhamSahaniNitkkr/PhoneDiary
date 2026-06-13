const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const auth = require("../middleware/auth");
const { isDemoMode } = require("../config/demo");
const demoStore = require("../mock/store");

router.get("/", auth, async (req, res) => {
  try {
    if (isDemoMode()) {
      const user = demoStore.findUserById(req.user.id);
      if (!user) return res.status(404).json({ msg: "User not found" });
      const { password, ...safeUser } = user;
      return res.json(safeUser);
    }

    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/",
  [
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

    const { email, password } = req.body;

    try {
      if (isDemoMode()) {
        const user = demoStore.findUserByEmail(email);
        if (!user) {
          return res.status(400).json({ msg: "Invalid Credentials !" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid Credentials !" });
        }
        const payload = { user: { id: user.id } };
        return jwttoken.sign(payload, config.get("jwtsecret"), { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials !" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials !" });
      }
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
