// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: String,
    // other user-related fields
});

module.exports = mongoose.model('User', userSchema);
