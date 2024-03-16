/* eslint-disable new-cap */
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  recieverEmail: {
    type: String,
    required: true,
  },
});

const message = new mongoose.model('messageCollections', messageSchema);
module.exports = message;
