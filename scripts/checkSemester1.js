// Script to verify Semester 1 courses
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function checkSemester1() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Get all semester 1 courses
    const s1Courses = await Course.find({ semester: '1' }).lean();
    console.log(`\nFound ${s1Courses.length} courses in Semester 1:`);
    
    // Display each course
    for(const course of s1Courses) {
      console.log(`- ${course.name} (${course.code})`);
    }
    
    // Check for Engineering Chemistry and Life Skills specifically
    const engineeringChemistry = await Course.findOne({ 
      name: 'Engineering Chemistry', 
      semester: '1' 
    }).lean();
    
    const lifeSkills = await Course.findOne({ 
      name: 'Life Skills', 
      semester: '1' 
    }).lean();
    
    console.log('\nDetails of specific courses:');
    
    if (engineeringChemistry) {
      console.log(`\nEngineering Chemistry (${engineeringChemistry.code}):`);
      if (engineeringChemistry.modules && engineeringChemistry.modules.length > 0) {
        console.log(`Has ${engineeringChemistry.modules.length} module references`);
        
        // Fetch modules separately
        const chemistryModules = await Module.find({
          _id: { $in: engineeringChemistry.modules }
        }).lean();
        
        console.log(`Found ${chemistryModules.length} chemistry modules in database:`);
        chemistryModules.forEach(module => {
          console.log(`- ${module.name} (${module.topics ? module.topics.length : 0} topics)`);
        });
      } else {
        console.log('No modules associated with Engineering Chemistry');
      }
    } else {
      console.log('Engineering Chemistry not found in semester 1!');
    }
    
    if (lifeSkills) {
      console.log(`\nLife Skills (${lifeSkills.code}):`);
      if (lifeSkills.modules && lifeSkills.modules.length > 0) {
        console.log(`Has ${lifeSkills.modules.length} module references`);
        
        // Fetch modules separately
        const lifeSkillsModules = await Module.find({
          _id: { $in: lifeSkills.modules }
        }).lean();
        
        console.log(`Found ${lifeSkillsModules.length} life skills modules in database:`);
        lifeSkillsModules.forEach(module => {
          console.log(`- ${module.name} (${module.topics ? module.topics.length : 0} topics)`);
        });
      } else {
        console.log('No modules associated with Life Skills');
      }
    } else {
      console.log('Life Skills not found in semester 1!');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the script
checkSemester1(); 