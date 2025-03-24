// Script to verify imported data
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function verifyImportedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Count courses and modules
    const courseCount = await Course.countDocuments();
    const moduleCount = await Module.countDocuments();
    
    console.log(`Total courses imported: ${courseCount}`);
    console.log(`Total modules imported: ${moduleCount}`);
    
    // Get 5 sample courses with their modules
    const courses = await Course.find()
      .limit(5)
      .populate('modules');
    
    console.log('\nSample courses:');
    for (const course of courses) {
      console.log(`- ${course.name} (${course.code}), Semester: ${course.semester}, Branch: ${course.branch}`);
      console.log(`  Modules: ${course.modules.length}`);
      
      // If modules are populated, print their details
      if (course.modules.length > 0) {
        // Get modules for this course
        const modules = await Module.find({ courseId: course._id });
        
        for (const module of modules) {
          console.log(`  - ${module.name}`);
          console.log(`    Topics: ${module.topics.length}`);
          if (module.topics.length > 0) {
            console.log(`    First topic: ${module.topics[0]}`);
          }
        }
      }
    }
    
  } catch (error) {
    console.error('Error verifying imported data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the verification
verifyImportedData(); 