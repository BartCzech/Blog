var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', postController.posts_read);
router.post('/', protect, postController.find_posts);
router.post('/create', protect, postController.create_post);

module.exports = router;
