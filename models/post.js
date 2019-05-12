const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like'
    }
  ]
});

postSchema.pre('findOne', { query: true }, populateFinds);

postSchema.pre('find', { query: true }, populateFinds);

function populateFinds(next) {
  this.populate({
    path: 'creator',
    model: 'User',
    select: '_id name imageUrl status'
  });
  this.populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'creator',
      model: 'User',
      select: '_id name imageUrl status',
      options: { sort: { createdAt: 1 } }
    }
  });
  this.populate({
    path: 'likes',
    model: 'Like',
    populate: { path: 'creator', model: 'User', select: '_id name imageUrl status' }
  });
  next();
}

module.exports = mongoose.model('Post', postSchema);
