const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  moduleId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
      type: Number,
      required: true
    },
    topic: {
      type: String,
      required: true
    }
  }],
  answers: [{
    type: Number,
    required: true
  }],
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timeTaken: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;