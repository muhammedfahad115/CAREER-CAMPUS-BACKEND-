
const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line new-cap
const students = new mongoose.model('StudentCollection', studentsSchema);

module.exports = students;
