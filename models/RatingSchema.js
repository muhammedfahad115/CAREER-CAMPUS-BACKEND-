const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  rating: {
    type: String,
    required: true,
  },
  institutionEmail: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const Rating = new mongoose.model('RatingCollections', RatingSchema);

module.exports = Rating;
