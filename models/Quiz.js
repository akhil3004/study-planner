const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    topic: String
  }],
  answers: [Number],
  score: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, // in milliseconds
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;