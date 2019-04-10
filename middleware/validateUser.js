const { body } = require('express-validator/check');
const db = require('../models/index');

// Validation methods depending on which method is passed in
exports.validateUser = method => {
  switch (method) {
    case 'createUser': {
      return [
        body('email')
          .isEmail()
          .withMessage('Enter a valid email.')
          .custom((value, { req }) => {
            return db.User.findOne({ email: value }).then(user => {
              if (user) {
                return Promise.reject('Email address already exists.');
              }
            });
          })
          .normalizeEmail(),
        body('password')
          .trim()
          .isLength({ min: 5 }),
        body('')
          .trim()
          .not()
          .isEmpty()
      ];
    }
  }
};
