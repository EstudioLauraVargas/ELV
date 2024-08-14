const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generateToken } = require("../middleware/auth");
const userController = require("../controllers/Signin");


router.post("/signup", userController.signup);


router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    const token = generateToken(user);
    res.status(200).json({ token, user });
  })(req, res, next);
});

module.exports = router;
