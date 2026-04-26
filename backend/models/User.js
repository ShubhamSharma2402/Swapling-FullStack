const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Plain text for simplicity, in real project use bcrypt
});

module.exports = mongoose.model('User', userSchema);
