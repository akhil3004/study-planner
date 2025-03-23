const mongoose = require('mongoose');

const studyProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moduleId: {
    type: String,
    required: true
  },
  completedTopics: [{
    type: String,
    required: true
  }],
  studyTime: {
    type: Number, // in milliseconds
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudyProgress', studyProgressSchema); 