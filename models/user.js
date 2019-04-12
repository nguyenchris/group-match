const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  date: { type: Date, default: Date.now },
  status: { type: Boolean },
  lastSignIn: { type: Date }
});

// userSchema.methods.checkPassword = function(password) {

// }

module.exports = mongoose.model('User', userSchema);
