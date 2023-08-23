const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.posts_read = asyncHandler(async (req, res) => {
  const all_posts = await Post.find();
  res.json(all_posts);
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

exports.get_post = asyncHandler(async (req, res, next) => {
  const [post, comments] = await Promise.all([
    Post.findById(req.params.id).populate("author").exec(),
    Comment.find({ post: req.params.id }).exec()
  ]);
  res.json({post: post, comments: comments});
});

exports.create_comment = [
  body("author_anon").escape(),
  body("text").escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send("Errors occurred");
    } else {
      const new_comment = new Comment({
        post: req.params.id,
        text: req.body.text,
        author_anon: req.body.author_anon,
        timestamp: Date.now(),
      });
      await new_comment.save();
      res.json(new_comment);
    }
  }),
];

exports.get_create_post = asyncHandler(async (req, res, next) => {
  res.json({message: "Accessing get create post"})
});