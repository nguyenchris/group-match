const express = require('express');
const router = express.Router();
const feedController = require('../../controllers/feedController');
const isAuth = require('../../middleware/isAuth');
const likeController = require('../../controllers/likeController');

router
  .route('/post')
  .get(isAuth, feedController.getPosts)
  .post(isAuth, feedController.createPost);
router.route('/like').post(isAuth, feedController.createLike);
module.exports = router;
