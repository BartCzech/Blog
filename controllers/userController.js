const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.users_read = asyncHandler(async (req, res) => {
  res.json({
    message: "users read",
  });
});
