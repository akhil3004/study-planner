const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number, // Index of correct option
      required: true
    },
    explanation: String
  }],
  timeLimit: {
    type: Number, // in minutes
    default: 15
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;