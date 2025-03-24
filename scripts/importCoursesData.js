// Script to import courses data from MongoDB collections
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function importCoursesData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Clear existing data and drop indexes
    await Course.deleteMany({});
    await Module.deleteMany({});
    console.log('Cleared existing courses and modules data');
    
    // Drop any existing indexes that might cause conflicts
    try {
      await mongoose.connection.db.collection('courses').dropIndexes();
      console.log('Dropped indexes on courses collection');
    } catch (error) {
      console.error('Error dropping indexes:', error.message);
    }
    
    // Get data from MongoDB collections
    const db = mongoose.connection.db;
    
    // Check if collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('Available collections:', collectionNames);
    
    // Generate unique course codes
    const codeMap = new Map();
    
    // Get data from collections
    let coursesData = [];
    
    if (collectionNames.includes('course2')) {
      console.log('Importing data from course2 collection');
      const course2Data = await db.collection('course2').find({}).toArray();
      
      // Process each course from course2 collection
      for (const rawCourse of course2Data) {
        try {
          // Extract course info and ensure unique code
          let courseCode = rawCourse.code || 'N/A';
          if (codeMap.has(courseCode)) {
            const count = codeMap.get(courseCode) + 1;
            codeMap.set(courseCode, count);
            courseCode = `${courseCode}-${count}`;
          } else {
            codeMap.set(courseCode, 1);
          }
          
          const courseInfo = {
            name: rawCourse.name || 'Unknown Course',
            code: courseCode,
            semester: rawCourse.semester?.toString() || '1',
            branch: rawCourse.branch || 'Computer Science and Engineering',
            modules: []
          };
          
          console.log(`Processing course: ${courseInfo.name} (${courseInfo.code})`);
          
          // Create and save course
          const course = new Course(courseInfo);
          await course.save();
          
          // Process modules
          if (rawCourse.modules && Array.isArray(rawCourse.modules)) {
            for (const rawModule of rawCourse.modules) {
              if (rawModule && rawModule.name) {
                // Create module
                const moduleInfo = {
                  name: rawModule.name,
                  courseId: course._id,
                  topics: rawModule.topics || []
                };
                
                // Save module
                const module = new Module(moduleInfo);
                await module.save();
                
                // Add module to course
                course.modules.push(module._id);
              }
            }
            
            // Update course with modules
            await course.save();
          }
        } catch (error) {
          console.error('Error processing course:', error.message);
        }
      }
    }
    
    if (collectionNames.includes('courses')) {
      console.log('Importing data from courses collection');
      const coursesCollectionData = await db.collection('courses').find({}).toArray();
      
      // Process each course from courses collection
      for (const rawCourse of coursesCollectionData) {
        try {
          // Extract course info and ensure unique code
          let courseCode = rawCourse.code || 'N/A';
          if (codeMap.has(courseCode)) {
            const count = codeMap.get(courseCode) + 1;
            codeMap.set(courseCode, count);
            courseCode = `${courseCode}-${count}`;
          } else {
            codeMap.set(courseCode, 1);
          }
          
          const courseInfo = {
            name: rawCourse.name || 'Unknown Course',
            code: courseCode,
            semester: rawCourse.semester?.toString() || '1',
            branch: rawCourse.branch || 'Computer Science and Engineering',
            modules: []
          };
          
          console.log(`Processing course: ${courseInfo.name} (${courseInfo.code})`);
          
          // Create and save course
          const course = new Course(courseInfo);
          await course.save();
          
          // Process modules
          if (rawCourse.modules && Array.isArray(rawCourse.modules)) {
            for (const rawModule of rawCourse.modules) {
              if (rawModule && rawModule.name) {
                // Create module
                const moduleInfo = {
                  name: rawModule.name,
                  courseId: course._id,
                  topics: rawModule.topics || []
                };
                
                // Save module
                const module = new Module(moduleInfo);
                await module.save();
                
                // Add module to course
                course.modules.push(module._id);
              }
            }
            
            // Update course with modules
            await course.save();
          }
        } catch (error) {
          console.error('Error processing course:', error.message);
        }
      }
    }
    
    console.log('Data import completed successfully');
    
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  }
}

// Run the import
importCoursesData(); 