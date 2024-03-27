const mongoose = require('mongoose');

const StudentComments = new mongoose.Schema({
  comments: {
    type: String,
    required: true,
  },
});

const StudentComment = new mongoose.model('studentCommentCollections',
    StudentComments);

module.exports = StudentComment;
