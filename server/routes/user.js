const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/protected', userController.verify);
router.post('/delete', userController.delete);
// router.post('/logout', userController.logout);

module.exports = router;