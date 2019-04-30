const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxAttendees: { type: Number, required: true },
  preference: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  event: { type: Schema.Types.Mixed }
});

module.exports = mongoose.model('Meetup', meetupSchema);
