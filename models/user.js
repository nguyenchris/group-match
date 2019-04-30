const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: true },
  aboutMe: { type: String },
  imageUrl: { type: String },
  lastSignIn: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now },
  isProfileCreated: { type: Boolean, default: false },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// userSchema.methods.checkPassword = function(password) {

// }

module.exports = mongoose.model('User', userSchema);
