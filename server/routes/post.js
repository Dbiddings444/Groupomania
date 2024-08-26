const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const upload = require('../middleware/upload');

router.post('/getPosts', postController.getPosts);
router.post('/addPost', postController.addPost);
router.post('/addMedia', upload, postController.addMedia);
router.post('/getMedia', postController.getMedia);

module.exports = router;