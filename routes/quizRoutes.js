const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authController = require('../controllers/authController');

// Apply authentication middleware to all routes
router.use(authController.isAuthenticated);

router.get('/module/:moduleId', quizController.getQuiz);
router.post('/submit/:quizId', quizController.submitQuiz);

module.exports = router;