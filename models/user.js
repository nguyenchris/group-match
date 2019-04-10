const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  date: { type: Date, default: Date.now },
  lastSignIn: { type: Date }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
