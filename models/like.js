const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const like = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  event: { type: Schema.Types.ObjectId, ref: 'Event' }
});

// userSchema.methods.checkPassword = function(password) {

// }

module.exports = mongoose.model('Like', likeSchema);
