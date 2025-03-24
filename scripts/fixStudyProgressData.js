// Script to fix study progress data with invalid moduleId references
require('dotenv').config();
const mongoose = require('mongoose');
const StudyProgress = require('../models/StudyProgress');
const Module = require('../models/Module');
const QuizResult = require('../models/QuizResult');

async function fixStudyProgressData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // 1. First, get all study progress entries
    const studyProgress = await StudyProgress.find({});
    console.log(`Found ${studyProgress.length} study progress entries`);
    
    // Track progress
    let invalidEntries = 0;
    let fixedEntries = 0;
    let deletedEntries = 0;
    
    // 2. Check each entry for validity
    for (const entry of studyProgress) {
      try {
        // Try to find the module
        const module = await Module.findById(entry.moduleId);
        
        if (!module) {
          console.log(`Invalid moduleId ${entry.moduleId} in study progress entry ${entry._id}`);
          invalidEntries++;
          
          // We need to either delete this entry or find a valid module to associate it with
          // For this example, we'll delete entries with invalid moduleId
          await StudyProgress.deleteOne({ _id: entry._id });
          console.log(`Deleted study progress entry ${entry._id}`);
          deletedEntries++;
        }
      } catch (err) {
        console.log(`Error processing entry ${entry._id}: ${err.message}`);
        invalidEntries++;
        
        // Delete entries with errors
        await StudyProgress.deleteOne({ _id: entry._id });
        console.log(`Deleted study progress entry ${entry._id} due to error`);
        deletedEntries++;
      }
    }
    
    // 3. Now check quiz results 
    const quizResults = await QuizResult.find({});
    console.log(`Found ${quizResults.length} quiz result entries`);
    
    let invalidQuizzes = 0;
    let deletedQuizzes = 0;
    
    // Check each quiz result
    for (const quiz of quizResults) {
      try {
        // Try to find the module
        const module = await Module.findById(quiz.moduleId);
        
        if (!module) {
          console.log(`Invalid moduleId ${quiz.moduleId} in quiz result ${quiz._id}`);
          invalidQuizzes++;
          
          // Delete entries with invalid moduleId
          await QuizResult.deleteOne({ _id: quiz._id });
          console.log(`Deleted quiz result ${quiz._id}`);
          deletedQuizzes++;
        }
      } catch (err) {
        console.log(`Error processing quiz ${quiz._id}: ${err.message}`);
        invalidQuizzes++;
        
        // Delete entries with errors
        await QuizResult.deleteOne({ _id: quiz._id });
        console.log(`Deleted quiz result ${quiz._id} due to error`);
        deletedQuizzes++;
      }
    }
    
    // 4. Print summary
    console.log('\nData cleanup summary:');
    console.log(`Study Progress: ${studyProgress.length} total entries`);
    console.log(`- Invalid entries: ${invalidEntries}`);
    console.log(`- Fixed entries: ${fixedEntries}`);
    console.log(`- Deleted entries: ${deletedEntries}`);
    console.log(`Quiz Results: ${quizResults.length} total entries`);
    console.log(`- Invalid entries: ${invalidQuizzes}`);
    console.log(`- Deleted entries: ${deletedQuizzes}`);
    
  } catch (error) {
    console.error('Error fixing study progress data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  }
}

// Run the fix
fixStudyProgressData(); 