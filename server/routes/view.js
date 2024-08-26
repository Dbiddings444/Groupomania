const express = require('express');
const router = express.Router();
const viewController = require('../controllers/view');

router.get('/getViews', viewController.getViews);
router.post('/addView', viewController.addView);

module.exports = router;