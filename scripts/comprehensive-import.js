// Script to perform a comprehensive import of all course data
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function comprehensiveImport() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Clear existing course and module data
    await Course.deleteMany({});
    await Module.deleteMany({});
    console.log('Cleared existing courses and modules data');
    
    // Get database and collections
    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('Available collections:', collectionNames);
    
    // Find all course-related collections
    const courseCollections = collectionNames.filter(name => 
      name.toLowerCase().includes('course') || 
      name.toLowerCase().includes('subject') ||
      name.toLowerCase().includes('syllabus')
    );
    
    console.log(`Found ${courseCollections.length} course-related collections:`, courseCollections);
    
    // Track all imported courses to avoid duplicates
    const importedCourses = new Map(); // Map by name+semester+branch
    let courseCount = 0;
    let moduleCount = 0;
    let topicCount = 0;
    
    // Process each collection
    for (const collectionName of courseCollections) {
      console.log(`\nProcessing collection: ${collectionName}`);
      
      try {
        // Get all documents in the collection
        const documents = await db.collection(collectionName).find({}).toArray();
        console.log(`Found ${documents.length} documents in ${collectionName}`);
        
        // Process each document
        for (const doc of documents) {
          try {
            // Extract course fields from document
            let courseName = doc.name || doc.courseName || doc.title || 'Unknown Course';
            let courseCode = doc.code || doc.courseCode || doc.id || `COURSE-${Math.floor(Math.random() * 10000)}`;
            let semester = doc.semester?.toString() || doc.sem?.toString() || '1';
            let branch = doc.branch || doc.department || 'Computer Science and Engineering';
            
            // Create a unique identifier for this course
            const courseKey = `${courseName}-${semester}-${branch}`;
            
            // Skip if already imported this course
            if (importedCourses.has(courseKey)) {
              console.log(`Skipping duplicate course: ${courseName}`);
              continue;
            }
            
            console.log(`Importing course: ${courseName} (${courseCode}) - Semester ${semester}, ${branch}`);
            
            // Create new course
            const course = new Course({
              name: courseName,
              code: courseCode,
              semester: semester,
              branch: branch,
              modules: []
            });
            
            // Save course to get an _id
            await course.save();
            courseCount++;
            
            // Extract modules from document
            let modules = [];
            
            // Try different possible module field names
            if (Array.isArray(doc.modules)) {
              modules = doc.modules;
            } else if (Array.isArray(doc.chapters)) {
              modules = doc.chapters;
            } else if (Array.isArray(doc.units)) {
              modules = doc.units;
            } else if (Array.isArray(doc.sections)) {
              modules = doc.sections;
            } else if (doc.syllabus && Array.isArray(doc.syllabus)) {
              modules = doc.syllabus;
            } else {
              // If no modules found, create a default one with any topics
              const allTopics = [];
              
              // Try to extract topics from different possible field names
              if (Array.isArray(doc.topics)) {
                allTopics.push(...doc.topics);
              } else if (Array.isArray(doc.subtopics)) {
                allTopics.push(...doc.subtopics);
              } else if (Array.isArray(doc.content)) {
                allTopics.push(...doc.content);
              }
              
              // If we found topics directly on the course, add a default module
              if (allTopics.length > 0) {
                modules = [{ 
                  name: 'Module 1', 
                  topics: allTopics
                }];
              } else {
                // Create default modules
                modules = [
                  { name: 'Introduction', topics: ['Course Overview', 'Basic Concepts'] },
                  { name: 'Core Concepts', topics: ['Main Principles', 'Key Applications'] },
                  { name: 'Advanced Topics', topics: ['Research Areas', 'Future Directions'] }
                ];
              }
            }
            
            console.log(`Found ${modules.length} modules for course ${courseName}`);
            
            // Process each module
            for (const moduleData of modules) {
              try {
                if (!moduleData) continue;
                
                const moduleName = moduleData.name || moduleData.title || `Module ${course.modules.length + 1}`;
                
                // Extract topics
                let topics = [];
                
                // Try different possible topic field names
                if (Array.isArray(moduleData.topics)) {
                  topics = moduleData.topics;
                } else if (Array.isArray(moduleData.subtopics)) {
                  topics = moduleData.subtopics;
                } else if (Array.isArray(moduleData.content)) {
                  topics = moduleData.content;
                } else if (typeof moduleData.content === 'string') {
                  // If content is a string, split by periods or commas
                  topics = moduleData.content
                    .split(/[.,;]/)
                    .map(t => t.trim())
                    .filter(t => t.length > 0);
                }
                
                // Ensure all topics are strings
                const processedTopics = topics.map(topic => {
                  if (typeof topic === 'string') {
                    return topic;
                  } else if (topic && typeof topic === 'object') {
                    return topic.name || topic.title || JSON.stringify(topic);
                  } else {
                    return String(topic || 'Unnamed Topic');
                  }
                });
                
                // Add default topics if none found
                if (processedTopics.length === 0) {
                  processedTopics.push(
                    'Introduction to the module',
                    'Key concepts',
                    'Practical applications'
                  );
                }
                
                // Create module
                const module = new Module({
                  name: moduleName,
                  courseId: course._id,
                  topics: processedTopics
                });
                
                // Save module
                await module.save();
                moduleCount++;
                topicCount += processedTopics.length;
                
                // Add module to course
                course.modules.push(module._id);
                
                console.log(`  - Added module: ${moduleName} with ${processedTopics.length} topics`);
              } catch (moduleError) {
                console.error(`  - Error processing module:`, moduleError.message);
              }
            }
            
            // Update course with modules
            await course.save();
            
            // Mark as imported
            importedCourses.set(courseKey, true);
            
          } catch (docError) {
            console.error(`Error processing document:`, docError.message);
          }
        }
      } catch (collectionError) {
        console.error(`Error processing collection ${collectionName}:`, collectionError.message);
      }
    }
    
    console.log('\n=== IMPORT SUMMARY ===');
    console.log(`Imported ${courseCount} courses`);
    console.log(`Imported ${moduleCount} modules`);
    console.log(`Imported ${topicCount} topics`);
    console.log('========================');
    
  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the import
comprehensiveImport(); 