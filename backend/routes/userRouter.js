var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.users_read);
router.post('/signup', userController.signup);
// router.post('/login', userController.login);

module.exports = router;

