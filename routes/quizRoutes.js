const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController');

// Apply authentication middleware to all routes
router.use(authController.isAuthenticated);

// Generate quiz
router.post('/generate', quizController.generateQuiz);

// Submit quiz
router.post('/submit', quizController.submitQuiz);

// Get quiz results
router.get('/results', quizController.getQuizResults);

module.exports = router;