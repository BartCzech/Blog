const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const generateToken = require("../config/generateToken");

exports.users_read = asyncHandler(async (req, res) => {
  res.json({
    message: "users read",
  });
});

exports.signup = [
  body("email").escape(),
  body("password").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          const new_user = new User({
            email: req.body.email,
            password: hashedPassword,
          });
          if (!errors.isEmpty()) {
            res.json("There occurred errors while submitting the form.");
            return;
          } else {
            const userExists = await User.findOne({ email: req.body.email });
            if (userExists) {
              console.log(userExists);
              res.json({
                message: "user with this email exists",
              });
            } else {
              await new_user.save();
              res.json({
                message: "user successfully created",
                // we need to send a token using generateToken(new_user._id)
                token: generateToken(new_user._id),
              });
            }
          }
        }
      });
    } catch (error) {}
  }),
];

exports.login = asyncHandler(async (req, res) => {
  jwt.sign(
    { user: req.body.email },
    process.env.SECRET_KEY,
    { expiresIn: "30m" },
    (err, token) => {
      res.json({
        token: token,
      });
    }
  );
});
