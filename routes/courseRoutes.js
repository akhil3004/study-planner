const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');
const StudyProgress = require('../models/StudyProgress');
const QuizResult = require('../models/QuizResult');
const ScheduledSession = require('../models/ScheduledSession');
const User = require('../models/User');
const Course = require('../models/Course');
const Module = require('../models/Module');
const mongoose = require('mongoose');

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

// Route for courses by semester and branch
router.get('/semester/:semester/branch/:branch', async (req, res) => {
  try {
    const semester = req.params.semester;
    const branch = decodeURIComponent(req.params.branch);
    
    console.log(`Fetching courses for Semester: ${semester}, Branch: ${branch}`);
    
    // Find courses in the database
    const courses = await Course.find({
      semester: semester,
      branch: branch
    }).populate('modules');
    
    console.log(`Found ${courses.length} courses`);
    
    // Render courses page
    res.render('courses', {
      semester,
      branch,
      courses,
      page: 'courses'
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).render('error', {
      message: 'Failed to load courses',
      page: 'courses'
    });
  }
});

// Route for specific course and its modules
router.get('/course/:courseId/modules', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(`Fetching modules for course ID: ${courseId}`);
    
    // Find the course
    const course = await Course.findById(courseId).populate('modules');
    
    if (!course) {
      console.log(`Course not found with ID: ${courseId}`);
      return res.status(404).render('error', {
        message: 'Course not found',
        page: 'courses'
      });
    }
    
    console.log(`Found course: ${course.name} with ${course.modules ? course.modules.length : 0} modules`);
    
    // Render modules page
    res.render('modules', {
      course,
      page: 'courses'
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).render('error', {
      message: 'Failed to load modules',
      page: 'courses'
    });
  }
});

// Get study session for a module
router.get('/module/:moduleId/study', async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    console.log('Fetching module with ID:', moduleId);
    
    // Get the module with course details
    const module = await Module.findById(moduleId).populate('courseId');
    if (!module) {
      console.log('Module not found with ID:', moduleId);
      return res.status(404).render('error', {
        message: 'Module not found',
        page: 'courses'
      });
    }
    
    // Log module data for debugging
    console.log('Module found:', {
      name: module.name,
      courseId: module.courseId ? module.courseId._id : 'No courseId',
      topicsCount: module.topics ? module.topics.length : 0,
      topicsType: module.topics ? typeof module.topics : 'undefined'
    });
    
    // Get user's study progress for this module if logged in
    let userProgress = null;
    if (req.session.user && req.session.user.id) {
      const StudyProgress = mongoose.model('StudyProgress');
      userProgress = await StudyProgress.findOne({
        userId: req.session.user.id,
        moduleId: moduleId
      }).sort({ date: -1 });
    }
    
    // Ensure topics are properly formatted and enhanced
    let formattedTopics = [];
    if (module.topics && Array.isArray(module.topics)) {
      formattedTopics = module.topics.map((topic, index) => {
        // If topic is already a string, convert to enhanced object
        if (typeof topic === 'string') {
          return {
            name: topic,
            description: generateDescription(topic, module.name),
            recommendedStudyTime: 15 + (index % 3) * 5, // Generate varied study times (15, 20, or 25 minutes)
            resources: generateResources(topic, module.courseId ? module.courseId.name : module.name)
          };
        }
        // If topic is an object, ensure it has all required properties
        else if (topic && typeof topic === 'object') {
          return {
            name: topic.name || topic.title || 'Unnamed Topic',
            description: topic.description || generateDescription(topic.name || topic.title, module.name),
            recommendedStudyTime: topic.recommendedStudyTime || 15 + (index % 3) * 5,
            resources: topic.resources || generateResources(topic.name || topic.title, module.courseId ? module.courseId.name : module.name)
          };
        }
        // Fallback for other types
        else {
          const topicName = String(topic || `Topic ${index + 1}`);
          return {
            name: topicName,
            description: generateDescription(topicName, module.name),
            recommendedStudyTime: 15 + (index % 3) * 5,
            resources: generateResources(topicName, module.courseId ? module.courseId.name : module.name)
          };
        }
      });
    }
    
    // Update module with enhanced topics
    module.topics = formattedTopics;
    
    // Render the study session page
    res.render('study-session', {
      module,
      userProgress,
      page: 'courses'
    });
  } catch (error) {
    console.error('Error fetching study session:', error);
    res.status(500).render('error', {
      message: 'Failed to load study session',
      page: 'courses'
    });
  }
});

// Helper function to generate topic descriptions
function generateDescription(topicName, moduleName) {
  const descriptions = [
    `Detailed exploration of ${topicName} in the context of ${moduleName}.`,
    `Understanding the core principles of ${topicName} and its applications.`,
    `In-depth analysis of ${topicName} with practical examples and case studies.`,
    `Theoretical foundations and implementation details of ${topicName}.`,
    `Historical development and modern applications of ${topicName}.`
  ];
  
  // Select a random description
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Helper function to generate resource links
function generateResources(topicName, courseName) {
  const resources = [];
  
  // Add Wikipedia resource
  resources.push({
    title: `${topicName} - Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${topicName.replace(/\s+/g, '_')}`,
    type: 'Reference'
  });
  
  // Add video resources
  resources.push({
    title: `${topicName} - Video Tutorial`,
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topicName + ' ' + courseName)}`,
    type: 'Video'
  });
  
  // Add academic papers or books with 50% probability
  if (Math.random() > 0.5) {
    resources.push({
      title: `Research Paper: Advanced ${topicName}`,
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(topicName)}`,
      type: 'Academic'
    });
  }
  
  return resources;
}

// Save study progress
router.post('/api/study-progress', authController.isAuthenticated, async (req, res) => {
  try {
    const { moduleId, completedTopics, studyTime } = req.body;
    const userId = req.session.user.id;

    // Validate required fields
    if (!moduleId || !completedTopics || !studyTime) {
      return res.status(400).json({ 
        error: 'Missing required fields: moduleId, completedTopics, or studyTime' 
      });
    }

    // First, check if the module exists
    const moduleExists = await Module.findById(moduleId);
    if (!moduleExists) {
      return res.status(400).json({
        error: 'Invalid moduleId: Module not found'
      });
    }

    // Create new study progress
    const studyProgress = new StudyProgress({
      userId,
      moduleId,  // This is already an ObjectId from the request
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
    
    // Find study progress and populate moduleId
    let progress = await StudyProgress.find({ userId })
      .populate('moduleId')
      .sort({ date: -1 });
    
    // Filter out any progress items where moduleId couldn't be populated
    progress = progress.filter(item => item.moduleId != null);

    // Get quiz results
    let quizResults = await QuizResult.find({ userId })
      .populate('moduleId')
      .sort({ date: -1 });
    
    // Filter out any quiz results where moduleId couldn't be populated
    quizResults = quizResults.filter(item => item.moduleId != null);

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

// API endpoint to get all courses
router.get('/api/courses', async (req, res) => {
  try {
    // Get query parameters
    const { semester, branch } = req.query;
    
    // Build query
    const query = {};
    if (semester) query.semester = semester;
    if (branch) query.branch = decodeURIComponent(branch);
    
    // Get courses from MongoDB
    const courses = await Course.find(query).populate('modules');
    
    // Return as JSON
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses API:', error);
    res.status(500).json({ 
      error: 'Failed to fetch courses',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// API endpoint to get all modules for a course
router.get('/api/course/:courseId/modules', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    // Get the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Get all modules for this course
    const modules = await Module.find({ courseId: course._id });
    
    // Return as JSON
    res.json({
      course,
      modules
    });
  } catch (error) {
    console.error('Error fetching modules API:', error);
    res.status(500).json({ 
      error: 'Failed to fetch modules',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// API endpoint to get module details
router.get('/api/module/:moduleId', async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    
    // Get the module with course details
    const module = await Module.findById(moduleId).populate('courseId');
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    
    // Format module topics
    const formattedModule = {
      ...module.toObject(),
      topics: module.topics.map((topic, index) => {
        if (typeof topic === 'string') {
          return {
            name: topic,
            description: generateDescription(topic, module.name),
            recommendedStudyTime: 15 + (index % 3) * 5,
            resources: generateResources(topic, module.courseId ? module.courseId.name : module.name)
          };
        } else if (topic && typeof topic === 'object') {
          return {
            name: topic.name || topic.title || 'Unnamed Topic',
            description: topic.description || generateDescription(topic.name || topic.title, module.name),
            recommendedStudyTime: topic.recommendedStudyTime || 15 + (index % 3) * 5,
            resources: topic.resources || generateResources(topic.name || topic.title, module.courseId ? module.courseId.name : module.name)
          };
        }
        return {
          name: `Topic ${index + 1}`,
          description: generateDescription(`Topic ${index + 1}`, module.name),
          recommendedStudyTime: 15 + (index % 3) * 5,
          resources: generateResources(`Topic ${index + 1}`, module.courseId ? module.courseId.name : module.name)
        };
      })
    };
    
    // Return as JSON
    res.json(formattedModule);
  } catch (error) {
    console.error('Error fetching module API:', error);
    res.status(500).json({ 
      error: 'Failed to fetch module',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;