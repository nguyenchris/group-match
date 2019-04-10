const mongoose = require('mongoose');
const db = require('../models');

// This file empties all collections

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/group-match-app', { useNewUrlParser: true }
);

// Data here
// const data = [{}, {}]

db.User
.deleteMany()
.then(data => {
  console.log('All users deleted!', data)
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
