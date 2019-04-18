const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const googleController = require('../../controllers/googleController');

// GET /api/google/key
router.route('/key').get(isAuth, googleController.getGoogleKey);

module.exports = router;
