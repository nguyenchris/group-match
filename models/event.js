const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxAmount: { type: Number, required: true },
  preference: { type: String, required: true }
  // eventData: {type: }
});

// userSchema.methods.checkPassword = function(password) {

// }

module.exports = mongoose.model('Event', eventSchema);
