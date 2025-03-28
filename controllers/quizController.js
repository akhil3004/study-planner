const Quiz = require('../models/Quiz');
const Module = require('../models/Module');
const Course = require('../models/Course');

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

// Generate quiz questions based on module topics
exports.generateQuiz = async (req, res) => {
  try {
    const { moduleId } = req.body;
    
    // Get the module from MongoDB
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Generate 5 questions based on topics
    const questions = [];
    const availableTopics = module.topics || [];

    // Make sure we have topics to create questions
    if (availableTopics.length === 0) {
      return res.status(400).json({ error: 'No topics available for this module' });
    }

    // Shuffle topics to get random selection
    const shuffledTopics = [...availableTopics].sort(() => Math.random() - 0.5);
    const selectedTopics = shuffledTopics.slice(0, Math.min(5, shuffledTopics.length));

    for (const topic of selectedTopics) {
      // Generate different types of questions based on topic
      const questionTypes = [
        {
          type: 'definition',
          template: `What is ${topic}?`,
          options: [
            `The correct definition of ${topic}`,
            `A related but incorrect concept`,
            `A different topic entirely`,
            `A partial definition`
          ]
        },
        {
          type: 'application',
          template: `Which of the following is an application of ${topic}?`,
          options: [
            `A real-world application`,
            `An unrelated concept`,
            `A different topic's application`,
            `An incorrect application`
          ]
        },
        {
          type: 'principle',
          template: `What is the main principle behind ${topic}?`,
          options: [
            `The core principle`,
            `A secondary principle`,
            `An unrelated principle`,
            `An incorrect principle`
          ]
        }
      ];

      // Select a random question type
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      const question = {
        question: questionType.template,
        options: questionType.options,
        correctAnswer: 0, // First option is always correct
        topic: topic
      };
      
      questions.push(question);
    }

    res.json({ questions });
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
};

// Submit quiz answers
exports.submitQuiz = async (req, res) => {
  try {
    const { moduleId, answers, timeTaken, questions } = req.body;
    const userId = req.session.user.id;

    // Get the module
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);

    // Save quiz result
    const quizResult = new Quiz({
      moduleId,
      userId,
      questions,
      answers,
      score,
      timeTaken,
      date: new Date()
    });

    await quizResult.save();

    res.json({ 
      success: true, 
      score,
      message: 'Quiz completed successfully'
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

// Get quiz results
exports.getQuizResults = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const results = await Quiz.find({ userId })
      .populate('moduleId')
      .sort({ date: -1 });

    res.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ error: 'Failed to fetch quiz results' });
  }
};