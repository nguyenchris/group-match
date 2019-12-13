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
  socketId: { type: String },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Helper static methods to update database for repetitive queries
userSchema.statics.updateStatus = function(id, status, socketId) {
  return this.findOneAndUpdate({ _id: id }, { status: status, socketId: socketId });
};
userSchema.statics.disconnectUser = function(socketId) {
  return this.findOneAndUpdate({ socketId: socketId }, { status: false });
};

module.exports = mongoose.model('User', userSchema);
