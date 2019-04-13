const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const { validationHandler } = require('../middleware/validationHandler');
const moment = require('moment');

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
        .then(newUser => {
          const token = jwt.sign(
            {
              email: newUser.email,
              userId: newUser._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          res.status(201).json({
            userId: newUser._id.toString(),
            email: newUser.email,
            name: newUser.name,
            status: newUser.status,
            token: token
          });
        });
    })
    .catch(err => {
      next(err);
    });
};

exports.login = (req, res, next) => {
  // req.getValidationResult()
  // .then(validationHandler())
  // .then(() => {
  //   bcrypt.compare()
  // })
};
