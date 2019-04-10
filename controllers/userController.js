const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const validateUSer = require('../middleware/validateUser');
const validationHandler = require('../middleware/validationHandler');
const { validationResult } = require('express-validator/check');

exports.signUp = (req, res, next) => {
  req.getValidationResult()
  
  bcrypt
    .hash(password, 10)
    .then(hashedPw => {
      const user = new db.User({
        email: email,
        password: hashedPw,
        name: req.body
      });
      return user.save();
    })
    .then(result => {
      res
        .status(201)
        .json({ userId: result._id, email: result.email, name: result.name });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
