const express = require('express');
const router = express.Router();
const viewController = require('../controllers/view');
const authorize = require('../middleware/authorize');

router.post('/getViews', authorize, viewController.getViews);
router.post('/addView', authorize, viewController.addView);

module.exports = router;