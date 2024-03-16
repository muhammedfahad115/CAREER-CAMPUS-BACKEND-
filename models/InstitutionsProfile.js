const mongoose = require('mongoose');

const InstitutionsProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

// eslint-disable-next-line new-cap
const InstitutionsProfie = new mongoose.model('InstitutionsProfile',
    InstitutionsProfileSchema);

module.exports = InstitutionsProfie;

