const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');
const StudyProgress = require('../models/StudyProgress');
const QuizResult = require('../models/QuizResult');
const ScheduledSession = require('../models/ScheduledSession');
const User = require('../models/User');
const courses = require('../data/courses');

// Apply authentication middleware to all routes
router.use(authController.isAuthenticated);

// Get all semesters
router.get('/semesters', (req, res) => {
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  res.render('semester', { semesters, page: 'courses' });
});

// Get branches for a semester
router.get('/semester/:semester/branches', (req, res) => {
  const semester = req.params.semester;
  const branches = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
  ];
  res.render('branch', { semester, branches, page: 'courses' });
});

// Get courses for a semester and branch
router.get('/semester/:semester/branch/:branch', (req, res) => {
  const semester = req.params.semester;
  const branch = decodeURIComponent(req.params.branch);
  
  // Get courses for the specified semester and branch
  const branchCourses = courses[branch] || {};
  const semesterCourses = branchCourses[semester] || [];

  res.render('courses', { 
    semester,
    branch,
    courses: semesterCourses,
    page: 'courses'
  });
});

router.get('/course/:courseId/modules', courseController.getModules);
router.get('/module/:moduleId/study', courseController.getStudySession);

// Save study progress
router.post('/api/study-progress', authController.isAuthenticated, async (req, res) => {
  try {
    const { moduleId, completedTopics, studyTime } = req.body;
    const userId = req.session.user.id; // Changed from req.user._id to req.session.user.id

    // Validate required fields
    if (!moduleId || !completedTopics || !studyTime) {
      return res.status(400).json({ 
        error: 'Missing required fields: moduleId, completedTopics, or studyTime' 
      });
    }

    // Create new study progress
    const studyProgress = new StudyProgress({
      userId,
      moduleId: moduleId,
      completedTopics,
      studyTime
    });

    // Save to database
    await studyProgress.save();
    
    res.status(201).json({ 
      message: 'Study progress saved successfully',
      progress: studyProgress 
    });
  } catch (error) {
    console.error('Error saving study progress:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to save study progress',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get study progress
router.get('/api/study-progress', authController.isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id; // Changed from req.user._id to req.session.user.id
    const progress = await StudyProgress.find({ userId })
      .sort({ date: -1 })
      .populate('moduleId');
    
    res.status(200).json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// View study progress page
router.get('/progress', authController.isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const progress = await StudyProgress.find({ userId })
      .populate('moduleId')
      .sort({ date: -1 });

    // Get quiz results
    const quizResults = await QuizResult.find({ userId })
      .populate('moduleId')
      .sort({ date: -1 });

    // Format total study time
    const formatTotalStudyTime = (progress) => {
      const totalMilliseconds = progress.reduce((total, session) => total + session.studyTime, 0);
      const hours = Math.floor(totalMilliseconds / 3600000);
      const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
      const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
      
      if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
      } else {
        return `${seconds}s`;
      }
    };

    res.render('dashboard/progress', {
      progress,
      quizResults,
      page: 'progress',
      formatTotalStudyTime
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).render('error', { 
      message: 'Failed to load progress page',
      page: 'progress'
    });
  }
});

// Schedule study session
router.post('/api/study-sessions/schedule', authController.isAuthenticated, async (req, res) => {
  try {
    const { moduleId, moduleName, courseName, scheduledDate } = req.body;
    const userId = req.session.user.id;

    // Validate required fields
    if (!moduleId || !moduleName || !courseName || !scheduledDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Create scheduled session
    const scheduledSession = new ScheduledSession({
      userId,
      moduleId,
      moduleName,
      courseName,
      scheduledDate: new Date(scheduledDate)
    });

    await scheduledSession.save();

    // Return success
    res.json({ 
      success: true, 
      message: 'Study session scheduled successfully',
      session: scheduledSession
    });
  } catch (error) {
    console.error('Error scheduling study session:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to schedule study session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;