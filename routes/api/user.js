const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const userController = require('../../controllers/userController')
const validateUser = require('../../middleware/validateUser')

router.route('/user/signup').post(validateUser('createUser'), userController.signUp);

module.exports = router;
