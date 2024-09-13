const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const upload = require('../middleware/upload');
const authorize = require('../middleware/authorize');


router.post('/getPosts', authorize, postController.getPosts);
router.post('/addPost', authorize, upload, postController.addPost);
router.post('/addMedia', authorize, upload, postController.addMedia);
router.post('/getMedia', authorize, postController.getMedia);

module.exports = router;