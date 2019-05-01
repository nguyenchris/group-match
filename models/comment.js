const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	content: { type: String, required: true }
});

// userSchema.methods.checkPassword = function(password) {

// }

module.exports = mongoose.model('Comment', commentSchema);