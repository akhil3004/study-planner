const mongoose = require('mongoose');

const scheduledSessionSchema = new mongoose.Schema({
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
  moduleName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ScheduledSession = mongoose.model('ScheduledSession', scheduledSessionSchema);

module.exports = ScheduledSession; 