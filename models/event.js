const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventId: { type: String },
  name: { type: String },
  data: Schema.Types.Mixed
});

module.exports = mongoose.model('Event', eventSchema);
