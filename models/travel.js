const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
   date: {
    type: Date,
    default: Date.now
  },
  origin: {
     type: String,
     required: true
  },
  destination: {
    type: String,
    required: true
  },
  Departure_date: {
    type: String,
    required: true
  },
  Gender_preference: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  No_of_pessanger: {
    type: String,
    required: true
  }
});

const Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;