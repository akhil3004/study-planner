const mongoose = require('mongoose');

const studyProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  completedTopics: [{
    type: String
  }],
  studyTime: {
    type: Number, // time in milliseconds
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const StudyProgress = mongoose.model('StudyProgress', studyProgressSchema);

module.exports = StudyProgress; 