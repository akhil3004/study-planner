const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Module = require('../models/Module');

// API endpoint to get all courses
router.get('/courses', async (req, res) => {
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
router.get('/course/:courseId/modules', async (req, res) => {
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
router.get('/module/:moduleId', async (req, res) => {
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

module.exports = router; 