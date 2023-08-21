const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.posts_read = asyncHandler(async (req, res) => {
  res.json({
    message: "posts read",
  });
});

exports.find_posts = asyncHandler(async (req, res) => {
  const keyword = req.query.search
  ? {
    $or: [
      { title: { $regex: req.query.search, $options: "i" } },
      { text: { $regex: req.query.search, $options: "i" } },
    ],
  } : {};
  const posts = await Post.find(keyword);
  res.send(posts);
});
