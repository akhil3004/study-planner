// Script to test database connectivity and verify data import
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function testDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Get all courses
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses`);
    
    // Print first 3 courses
    for (let i = 0; i < Math.min(3, courses.length); i++) {
      const course = courses[i];
      console.log(`\nCourse ${i+1}: ${course.name} (${course.code})`);
      console.log(`- Semester: ${course.semester}`);
      console.log(`- Branch: ${course.branch}`);
      
      // Get modules for this course
      const modules = await Module.find({ courseId: course._id });
      console.log(`- Found ${modules.length} modules`);
      
      // Print first 2 modules
      for (let j = 0; j < Math.min(2, modules.length); j++) {
        const module = modules[j];
        console.log(`  - Module ${j+1}: ${module.name}`);
        
        // Print topics
        if (module.topics && module.topics.length > 0) {
          console.log(`    - ${module.topics.length} topics`);
          
          // Print first 2 topics
          for (let k = 0; k < Math.min(2, module.topics.length); k++) {
            const topic = module.topics[k];
            console.log(`      - Topic ${k+1}: ${typeof topic === 'string' ? topic : (topic.name || 'Unnamed')}`);
          }
        } else {
          console.log('    - No topics found');
        }
      }
    }
    
  } catch (error) {
    console.error('Database test error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the test
testDatabase(); 