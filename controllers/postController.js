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

exports.create_post = [
  body("title").escape(),
  body("text").escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send("Errors occurred");
    } else {
      const new_post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user,
        timestamp: Date.now(),
      });
      await new_post.save();
      res.json(new_post);
    }
  }),
];
