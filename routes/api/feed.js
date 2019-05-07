const express = require('express');
const router = express.Router();
const feedController = require('../../controllers/feedController');
const isAuth = require('../../middleware/isAuth');

// router.route('/').get(isAuth)

module.exports = router;
