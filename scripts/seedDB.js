const mongoose = require('mongoose');
const db = require('../models');

// This file empties the * collection and inserts the *

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/group-match-app'
);

// Data here
// const data = [{}, {}]

// db.(*)
// .remove({})
// .then(() => db.Book.collection.insertMany(bookSeed))
// .then(data => {
//   console.log(data.result.n + " records inserted!");
//   process.exit(0);
// })
// .catch(err => {
//   console.error(err);
//   process.exit(1);
// });
