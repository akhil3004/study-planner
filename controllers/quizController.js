const Quiz = require('../models/Quiz');
const Module = require('../models/Module');

exports.getQuiz = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    
    const moduleId = req.params.moduleId;
    
    const module = await Module.findById(moduleId).populate('courseId');
    if (!module) {
      return res.status(404).send('Module not found');
    }
    
    const quiz = await Quiz.findOne({ moduleId });
    if (!quiz) {
      return res.status(404).send('Quiz not found for this module');
    }
    
    res.render('quiz', { module, quiz, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    
    const quizId = req.params.quizId;
    const answers = req.body.answers; // Array of selected answers
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    
    let score = 0;
    const results = [];
    
    // Calculate score
    for (let i = 0; i < quiz.questions.length; i++) {
      const isCorrect = parseInt(answers[i]) === quiz.questions[i].correctAnswer;
      if (isCorrect) score++;
      
      results.push({
        question: quiz.questions[i].question,
        userAnswer: parseInt(answers[i]),
        correctAnswer: quiz.questions[i].correctAnswer,
        isCorrect,
        explanation: quiz.questions[i].explanation
      });
    }
    
    const percentage = (score / quiz.questions.length) * 100;
    
    res.render('quiz-results', {
      quiz,
      score,
      total: quiz.questions.length,
      percentage,
      results,
      user: req.session.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};