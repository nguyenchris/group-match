const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const eventBriteController = require('../../controllers/eventBriteController');

// All routes match with '/api/event
router.route('/search').get(isAuth, eventBriteController.getCityAutocomplete);

module.exports = router;
