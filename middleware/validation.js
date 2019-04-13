const { body } = require('express-validator/check');
const db = require('../models/index');

// Validation methods depending on which method is passed in
exports.validateUser = method => {
  switch (method) {
    case 'createUser': {
      return [
        body('name')
          .trim()
          .not()
          .isEmpty()
          .withMessage('Name cannot be empty.')
          .escape()
          .isLength({ min: 2 })
          .withMessage('Name must be at least 2 characters long.'),
        body('email')
          .isEmail()
          .withMessage('Enter a valid email.')
          .normalizeEmail()
          .custom((value, { req }) => {
            return db.User.findOne({ email: value }).then(user => {
              if (user) {
                return Promise.reject('Email address already exists.');
              }
            });
          }),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Password must be at least 5 characters long.')
          .custom((value, { req }) => {
            if (value !== req.body.confirm) {
              return false;
            } else {
              return true;
            }
          })
          .withMessage("Passwords don't match.")
      ];
    }
    case 'loginUser': {
      return [
        body('email')
          .isEmail()
          .withMessage('Enter a valid email.')
          .normalizeEmail(),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Password must be at least 5 characters long.')
      ];
    }
  }
};
