const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: Number,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;