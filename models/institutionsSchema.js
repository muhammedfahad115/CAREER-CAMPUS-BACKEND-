/* eslint-disable new-cap */
const mongoose = require('mongoose');

const institutionsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const institutions = new mongoose.model('institutionsCollection',
    institutionsSchema);

module.exports = institutions;
