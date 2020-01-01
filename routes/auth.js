const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwttoken = require("jsonwebtoken");
var config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const auth = require("../middleware/auth");

// @route get api/auth
// @des   get user from server
// @acess Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route Post api/auth
// @des   login user /sign in
// @acess Public

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
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials !" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials !" });
      }
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
