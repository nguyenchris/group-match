const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator')

const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(expressValidator())
app.use(routes);

// Run 'mongo' and 'mongod' in Terminal if in dev environment
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/group-match-app',
  { useNewUrlParser: true }
);

// Middleware to return all errors in json response
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message, data: error.data });
  // res.status(status).json(error)
});

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
