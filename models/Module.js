const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: Number,
    required: true
  },
  topics: [{
    name: {
      type: String,
      required: true
    },
    recommendedStudyTime: {
      type: Number, // in minutes
      required: true
    },
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['video', 'pdf', 'article', 'other']
      }
    }]
  }]
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;