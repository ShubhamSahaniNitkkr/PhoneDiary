const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwttoken = require("jsonwebtoken");
var config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");

// @route get api/client
// @des   get logged in user / sign up
// @acess Private

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
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
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user already exist !" });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwttoken.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // res.send("Sign up complete !");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
