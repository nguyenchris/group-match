const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const eventBriteController = require('../../controllers/eventBriteController');

// All routes match with '/api/event
router
  .route('/')
  .get(isAuth, eventBriteController.getMeetups)
  .post(isAuth, eventBriteController.postCreateEvent);
router.route('/search').get(isAuth, eventBriteController.getEventSearch);
router.route('/location').get(isAuth, eventBriteController.getLocationAutocomplete);
router.route('/join').post(isAuth, eventBriteController.joinMeetup);
// DEV ONLY
router.route('/dev').get(isAuth, eventBriteController.devOnlyGetEvents);

module.exports = router;
