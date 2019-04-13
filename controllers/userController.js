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
      console.log(err);
      next(err);
    });
};

// Route: /api/user/login
// Controller for when user logs in
exports.login = (req, res, next) => {
  req
    .getValidationResult()
    .then(validationHandler())
    .then(() => {
      return db.User.findOne({ email: req.body.email });
    })
    .then(user => {
      if (!user) {
        const error = new Error('Incorrect email or password.');
        error.statusCode = 401;
        throw error;
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        const error = new Error('Incorrect email or password.');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id.toString()
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        userId: fetchedUser._id.toString(),
        email: fetchedUser.email,
        name: fetchedUser.name,
        status: fetchedUser.status,
        token: token
      });
    })
    .catch(err => {
      next(err);
    });
};
