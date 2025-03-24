// Script to check for missing data in courses collection
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function checkMissingData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Get all courses
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses`);
    
    // Check each course
    for (const course of courses) {
      console.log(`\nChecking course: ${course.name} (${course.code || 'No code'})`);
      console.log(`- Semester: ${course.semester || 'Unknown'}`);
      console.log(`- Branch: ${course.branch || 'Unknown'}`);
      
      // Check if course has modules
      if (!course.modules || course.modules.length === 0) {
        console.log(`- ERROR: No modules found for this course`);
        continue;
      }
      
      console.log(`- Has ${course.modules.length} module references`);
      
      // Get actual modules for this course
      const modules = await Module.find({ courseId: course._id });
      console.log(`- Found ${modules.length} actual modules in the modules collection`);
      
      if (modules.length === 0) {
        console.log(`- ERROR: No actual modules found for this course`);
        continue;
      }
      
      // Check each module
      for (const module of modules) {
        console.log(`  - Module: ${module.name}`);
        
        // Check if module has topics
        if (!module.topics) {
          console.log(`    - ERROR: No topics array found`);
          continue;
        }
        
        if (module.topics.length === 0) {
          console.log(`    - ERROR: Module has empty topics array`);
          continue;
        }
        
        console.log(`    - Has ${module.topics.length} topics`);
        
        // Check topic types
        const topicTypes = new Set();
        for (const topic of module.topics) {
          topicTypes.add(typeof topic);
        }
        
        console.log(`    - Topic types: ${Array.from(topicTypes).join(', ')}`);
        
        // Sample of topics
        const sampleSize = Math.min(2, module.topics.length);
        const samples = module.topics.slice(0, sampleSize);
        console.log(`    - Sample topics: `);
        samples.forEach((topic, i) => {
          if (typeof topic === 'string') {
            console.log(`      ${i+1}. ${topic.substring(0, 50)}${topic.length > 50 ? '...' : ''}`);
          } else if (typeof topic === 'object') {
            console.log(`      ${i+1}. ${JSON.stringify(topic).substring(0, 50)}${JSON.stringify(topic).length > 50 ? '...' : ''}`);
          } else {
            console.log(`      ${i+1}. ${topic} (${typeof topic})`);
          }
        });
      }
    }
    
  } catch (error) {
    console.error('Error checking data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the check
checkMissingData(); 