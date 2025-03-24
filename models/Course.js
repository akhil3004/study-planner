const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;