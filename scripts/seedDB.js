const mongoose = require('mongoose');
const db = require('../models');

// Local development script to empty all collections on localhost

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/group-match-app', { useNewUrlParser: true }
);

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
