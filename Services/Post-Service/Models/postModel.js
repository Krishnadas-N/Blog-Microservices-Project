// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },
  isBlocked:{
    type:Boolean,
    default:false
  },
  media: {
    type:String,
  }

});

module.exports = mongoose.model('Post', postSchema);
