var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require("../middleware/verifyToken");

router.get('/', verifyToken, postController.posts_read);

module.exports = router;
