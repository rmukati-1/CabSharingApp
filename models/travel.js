const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
   date: {
    type: Date,
    default: Date.now
  }
});

const Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;