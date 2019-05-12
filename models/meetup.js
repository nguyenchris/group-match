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

meetupSchema.pre('find', { query: true }, populateFinds);

meetupSchema.pre('findOne', { query: true }, populateFinds);

function populateFinds(next) {
  this.populate({
    path: 'creator',
    model: 'User',
    select: '_id name imageUrl status aboutMe lastSignIn createdOn friends',
    populate: {
      path: 'friends',
      model: 'User',
      select: '_id name imageUrl status aboutMe lastSignIn createdOn friends'
    }
  });
  this.populate({
    path: 'attendees',
    model: 'User',
    select: '_id name imageUrl status aboutMe lastSignIn createdOn friends'
  });
  next();
}

module.exports = mongoose.model('Meetup', meetupSchema);
