const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const { validationHandler } = require('../middleware/validationHandler');
const { fromNow } = require('../utils/date-helpers');
const moment = require('moment');

// POST /api/user/signup
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
            name: req.body.name
          });
          return user.save();
        })
        .then(newUser => {
          const token = jwt.sign(
            {
              email: newUser.email,
              userId: newUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          res.status(201).json({
            userId: newUser._id,
            email: newUser.email,
            name: newUser.name,
            status: newUser.status,
            imageUrl: newUser.imageUrl,
            lastSignIn: fromNow(newUser.lastSignIn),
            isProfileCreated: newUser.isProfileCreated,
            friends: newUser.friends,
            token: token
          });
        });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

// POST /api/user/login
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
      fetchedUser.lastSignIn = Date.now();
      return fetchedUser.save().then(result => {
        const token = jwt.sign(
          {
            email: result.email,
            userId: result._id.toString()
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.status(200).json({
          userId: result._id.toString(),
          email: result.email,
          name: result.name,
          aboutMe: result.aboutMe,
          status: result.status,
          imageUrl: result.imageUrl,
          lastSignIn: fromNow(result.lastSignIn),
          isProfileCreated: result.isProfileCreated,
          friends: result.friends,
          token: token
        });
      });
    })
    .catch(err => {
      next(err);
    });
};

// GET /api/user/:id
// Controller to get a specific user data
exports.getUser = (req, res, next) => {
  db.User.findById(req.params.id)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({
        userId: user._id,
        name: user.name,
        aboutMe: user.aboutMe,
        status: user.status,
        imageUrl: user.imageUrl,
        lastSignIn: fromNow(user.lastSignIn),
        createdOn: moment(user.createdOn).format('MMMM Do YYYY'),
        isProfileCreated: user.isProfileCreated,
        friends: user.friends
      });
    })
    .catch(err => {
      next(err);
    });
};

// POST /api/user/profile
exports.postProfile = (req, res, next) => {
  console.log('hi');
  db.User.findById(req.userId)
    .then(user => {
      user.isProfileCreated = true;
      user.aboutMe = req.body.aboutMe;
      user.imageUrl = req.body.imageUrl;
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        aboutMe: result.aboutMe,
        imageUrl: result.imageUrl,
        isProfileCreated: result.isProfileCreated
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};
