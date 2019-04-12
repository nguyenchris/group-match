const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const { validationHandler } = require('../middleware/validationHandler');
const moment = require('moment')

// Route: '/api/user/signup'
// Controller for when user signs up
exports.signUp = (req, res, next) => {
  req
    .getValidationResult()
    .then(validationHandler())
    .then(() => {
      bcrypt
        .hash(req.body.password, 10)
        .then(hashedPw => {
          const user = new db.User({
            email: req.body.email,
            password: hashedPw,
            name: req.body.name,
            status: true
          });
          return user.save();
        })
        .then(result => {
          res
            .status(201)
            .json({
              userId: result._id,
              email: result.email,
              name: result.name,
              status: result.status
            });
        });
    })
    .catch(err => {
      next(err);
    });
};
