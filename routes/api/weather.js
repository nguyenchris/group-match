const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const weatherController = require('../../controllers/weatherController');

// All routes match with '/api/event
router.route('/current').get(isAuth, weatherController.getCurrentWeather);

module.exports = router;
