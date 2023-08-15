const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.users_read = asyncHandler(async (req, res) => {
  res.json({
    message: "users read",
  });
});

exports.users_create = [
  body("email").escape(),
  body("password").escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json("There occurred errors while submitting the form.");
    } else {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        console.log(userExists);
        res.json({
          message: "user with this email exists",
        });
      } else {
        const new_user = new User({
          email: req.body.email,
          password: req.body.password,
        });
        await new_user.save();
        res.json({
          message: "user successfully created",
        });
      }
    }
  }),
];
