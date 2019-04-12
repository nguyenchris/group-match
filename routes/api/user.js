const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { validateUser } = require('../../middleware/validation');

// All routes match with '/api/user
router
  .route('/signup')
  .post(validateUser('createUser'), userController.signUp);

router.route('/login').post(validateUser('loginUser'), userController.login)

module.exports = router;
