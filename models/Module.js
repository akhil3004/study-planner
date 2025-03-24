const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  topics: [{
    type: String
  }]
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;