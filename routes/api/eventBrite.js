const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const eventBriteController = require('../../controllers/eventBriteController');

// All routes match with '/api/event
router.route('/search').get(isAuth, eventBriteController.getEventSearch);
router.route('/location').get(isAuth, eventBriteController.getLocationAutocomplete);

// DEV ONLY
router.route('/dev').get(isAuth, eventBriteController.devOnlyGetEvents);

module.exports = router;
