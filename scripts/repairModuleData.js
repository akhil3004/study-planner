// Script to repair module data
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

// Sample modules and topics if none are found
const sampleTopics = {
  "Introduction": [
    "Course Overview",
    "Basic Concepts",
    "Foundational Principles",
    "History and Development"
  ],
  "Core Principles": [
    "Fundamental Theories",
    "Key Components",
    "Problem-Solving Approaches",
    "Analytical Methods"
  ],
  "Applications": [
    "Practical Applications",
    "Case Studies",
    "Industry Examples",
    "Real-world Uses"
  ],
  "Advanced Concepts": [
    "Specialized Techniques",
    "Current Research Areas",
    "Emerging Technologies",
    "Future Directions"
  ],
  "Design Process": [
    "Introduction to Design and Engineering Design",
    "Design Process: Recognition of Need, Problem Definition, Abstraction and Synthesis, Analysis, Implementation and Evaluation"
  ],
  "Design Thinking Approach": [
    "Introduction to Design Thinking",
    "Iterative Design Thinking Process Stages: Empathize, Define, Ideate, Prototype and Test",
    "Design Thinking as Divergent-Convergent Questioning",
    "Design Thinking in a Team Environment"
  ]
};

async function repairModuleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Get all courses
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses`);
    
    let repairCount = 0;
    
    // Check each course
    for (const course of courses) {
      console.log(`\nChecking course: ${course.name} (${course.code})`);
      
      // Get modules for this course
      let modules = await Module.find({ courseId: course._id });
      console.log(`- Found ${modules.length} modules`);
      
      // If no modules found, create some default ones
      if (modules.length === 0) {
        console.log(`- Creating default modules for course: ${course.name}`);
        
        // Create default modules
        const defaultModules = [
          { name: "Introduction", courseId: course._id, topics: sampleTopics["Introduction"] },
          { name: "Core Principles", courseId: course._id, topics: sampleTopics["Core Principles"] },
          { name: "Applications", courseId: course._id, topics: sampleTopics["Applications"] },
          { name: "Advanced Concepts", courseId: course._id, topics: sampleTopics["Advanced Concepts"] }
        ];
        
        // Save modules
        for (const moduleData of defaultModules) {
          const newModule = new Module(moduleData);
          await newModule.save();
          console.log(`  - Created module: ${newModule.name}`);
        }
        
        // Update course with module references
        const createdModules = await Module.find({ courseId: course._id });
        course.modules = createdModules.map(m => m._id);
        await course.save();
        
        // Update modules variable for the rest of the function
        modules = createdModules;
        repairCount += modules.length;
      }
      
      // Check each module
      for (const module of modules) {
        console.log(`  - Module: ${module.name}`);
        
        // Check if topics exist
        if (!module.topics || module.topics.length === 0) {
          console.log(`    - NO TOPICS FOUND, adding sample topics`);
          
          // Get topics based on module name or use default
          let topicsToAdd = [];
          if (sampleTopics[module.name]) {
            topicsToAdd = sampleTopics[module.name];
          } else {
            // Use a default set
            topicsToAdd = sampleTopics["Introduction"];
          }
          
          // Update module with topics
          module.topics = topicsToAdd;
          await module.save();
          console.log(`    - Added ${topicsToAdd.length} topics to module`);
          repairCount++;
        }
        // Ensure topics are strings
        else if (module.topics.some(t => typeof t !== 'string')) {
          console.log(`    - Converting non-string topics to strings`);
          
          // Convert to strings
          const stringTopics = module.topics.map(topic => {
            if (typeof topic === 'string') return topic;
            if (typeof topic === 'object' && topic.name) return topic.name;
            return String(topic || 'Unnamed Topic');
          });
          
          // Update module
          module.topics = stringTopics;
          await module.save();
          console.log(`    - Converted ${stringTopics.length} topics to string format`);
          repairCount++;
        }
      }
    }
    
    console.log(`\nRepair complete. Fixed ${repairCount} modules/issues.`);
    
  } catch (error) {
    console.error('Error repairing data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the repair
repairModuleData(); 