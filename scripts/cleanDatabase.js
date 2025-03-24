// Script to clean the database of temporary/duplicate data
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function cleanDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');

    // Find potential temporary courses (containing "Core Subject" or "Elective Subject" in name)
    const tempPatterns = [
      /Core Subject \d+[A-Z]/,
      /Elective Subject \d+[A-Z]/,
      /Subject \d+[A-Z]/,
      /^Unknown Course/
    ];

    const temporaryCourses = await Course.find({
      $or: tempPatterns.map(pattern => ({ name: { $regex: pattern } }))
    });

    console.log(`Found ${temporaryCourses.length} temporary courses to clean up`);

    // Delete temporary courses and their modules
    for (const course of temporaryCourses) {
      console.log(`Deleting temporary course: ${course.name} (${course.code}) - Semester ${course.semester}`);

      // Delete associated modules
      if (course.modules && course.modules.length > 0) {
        const deleteModulesResult = await Module.deleteMany({ _id: { $in: course.modules } });
        console.log(`  - Deleted ${deleteModulesResult.deletedCount} associated modules`);
      }

      // Delete course
      await Course.deleteOne({ _id: course._id });
    }

    // Find orphaned modules (modules without a valid course)
    const allModules = await Module.find();
    console.log(`Checking ${allModules.length} modules for orphans...`);

    let orphanCount = 0;
    for (const module of allModules) {
      if (!module.courseId) {
        console.log(`Deleting orphaned module: ${module.name} (no courseId)`);
        await Module.deleteOne({ _id: module._id });
        orphanCount++;
        continue;
      }

      const courseExists = await Course.findById(module.courseId);
      if (!courseExists) {
        console.log(`Deleting orphaned module: ${module.name} (courseId: ${module.courseId} not found)`);
        await Module.deleteOne({ _id: module._id });
        orphanCount++;
      }
    }
    console.log(`Deleted ${orphanCount} orphaned modules`);

    // Check remaining courses and add to course.modules if the module has courseId but isn't in the modules array
    const remainingCourses = await Course.find();
    console.log(`\nChecking relationships for ${remainingCourses.length} remaining courses...`);

    for (const course of remainingCourses) {
      // Find modules that belong to this course but aren't in the modules array
      const courseMissingModules = await Module.find({
        courseId: course._id,
        _id: { $nin: course.modules || [] }
      });

      if (courseMissingModules.length > 0) {
        console.log(`Course "${course.name}" missing ${courseMissingModules.length} modules in its modules array`);
        
        // Add the missing modules to the course.modules array
        course.modules = [...(course.modules || []), ...courseMissingModules.map(m => m._id)];
        await course.save();
        console.log(`  - Updated course with missing modules`);
      }
    }

    // Verify data integrity after cleanup
    const finalCourseCount = await Course.countDocuments();
    const finalModuleCount = await Module.countDocuments();
    
    console.log('\n=== CLEANUP SUMMARY ===');
    console.log(`Removed ${temporaryCourses.length} temporary courses`);
    console.log(`Removed ${orphanCount} orphaned modules`);
    console.log(`Final count: ${finalCourseCount} courses and ${finalModuleCount} modules`);
    console.log('========================');
    
  } catch (error) {
    console.error('Error during database cleanup:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the cleanup
cleanDatabase(); 