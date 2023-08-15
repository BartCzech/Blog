var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.users_read);
router.post('/', userController.users_create);

module.exports = router;

