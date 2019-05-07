const express = require('express');
const router = express.Router();
const feedController = require('../../controllers/feedController');
const isAuth = require('../../middleware/isAuth');

router
  .route('/post')
  .get(isAuth, feedController.getPosts)
  .post(isAuth, feedController.createPost);

module.exports = router;
