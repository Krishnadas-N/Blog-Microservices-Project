const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type:String,
    required: true
  },
  commenter: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isBlocked:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('Comment', commentSchema);
