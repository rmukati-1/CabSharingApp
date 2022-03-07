const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    required: {
        type: String,
        required: true
    },
   firstname: {
    type: String,
    required: true
   },
   lastname: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true
   },
   password: {
    type: String,
     required: true
   },
   gender: {
     type: String,
     required: true},
   date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;