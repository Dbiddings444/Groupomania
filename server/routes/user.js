const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authorize = require('../middleware/authorize');

router.post('/register',  userController.register);
router.post('/login', userController.login);
router.post('/protected', userController.verify);
router.post('/delete', authorize, userController.delete);

module.exports = router;