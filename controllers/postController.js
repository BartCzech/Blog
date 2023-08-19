const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.posts_read = asyncHandler(async (req, res) => {
  res.json({
    message: "posts read",
  });
});
