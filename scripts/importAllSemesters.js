// Script to import courses for all semesters
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function importAllSemesters() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Create courses for all 8 semesters
    const allSemesterCourses = [];
    
    // Create sample courses for each semester
    for (let sem = 1; sem <= 8; sem++) {
      const semesterCourses = [
        {
          name: `Core Subject ${sem}A`,
          code: `CST ${sem}01`,
          semester: sem.toString(),
          branch: 'Computer Science and Engineering',
          modules: [
            {
              name: `Module 1 - Fundamentals of Subject ${sem}A`,
              topics: [
                `Introduction to Subject ${sem}A`,
                `Basic concepts of Subject ${sem}A`,
                `Historical development of Subject ${sem}A`,
                `Applications of Subject ${sem}A in industry`
              ]
            },
            {
              name: `Module 2 - Advanced Concepts of Subject ${sem}A`,
              topics: [
                `Advanced topic 1 of Subject ${sem}A`,
                `Advanced topic 2 of Subject ${sem}A`,
                `Advanced topic 3 of Subject ${sem}A`,
                `Case studies in Subject ${sem}A`
              ]
            },
            {
              name: `Module 3 - Practical Applications of Subject ${sem}A`,
              topics: [
                `Practical application 1 in Subject ${sem}A`,
                `Practical application 2 in Subject ${sem}A`,
                `Industry use cases for Subject ${sem}A`,
                `Future trends in Subject ${sem}A`
              ]
            }
          ]
        },
        {
          name: `Core Subject ${sem}B`,
          code: `CST ${sem}02`,
          semester: sem.toString(),
          branch: 'Computer Science and Engineering',
          modules: [
            {
              name: `Module 1 - Fundamentals of Subject ${sem}B`,
              topics: [
                `Introduction to Subject ${sem}B`,
                `Basic concepts of Subject ${sem}B`,
                `Historical development of Subject ${sem}B`,
                `Applications of Subject ${sem}B in industry`
              ]
            },
            {
              name: `Module 2 - Advanced Concepts of Subject ${sem}B`,
              topics: [
                `Advanced topic 1 of Subject ${sem}B`,
                `Advanced topic 2 of Subject ${sem}B`,
                `Advanced topic 3 of Subject ${sem}B`,
                `Case studies in Subject ${sem}B`
              ]
            },
            {
              name: `Module 3 - Practical Applications of Subject ${sem}B`,
              topics: [
                `Practical application 1 in Subject ${sem}B`,
                `Practical application 2 in Subject ${sem}B`,
                `Industry use cases for Subject ${sem}B`,
                `Future trends in Subject ${sem}B`
              ]
            }
          ]
        },
        {
          name: `Elective Subject ${sem}A`,
          code: `EST ${sem}01`,
          semester: sem.toString(),
          branch: 'Computer Science and Engineering',
          modules: [
            {
              name: `Module 1 - Fundamentals of Elective ${sem}A`,
              topics: [
                `Introduction to Elective ${sem}A`,
                `Basic concepts of Elective ${sem}A`,
                `Historical development of Elective ${sem}A`,
                `Applications of Elective ${sem}A in industry`
              ]
            },
            {
              name: `Module 2 - Advanced Concepts of Elective ${sem}A`,
              topics: [
                `Advanced topic 1 of Elective ${sem}A`,
                `Advanced topic 2 of Elective ${sem}A`,
                `Advanced topic 3 of Elective ${sem}A`,
                `Case studies in Elective ${sem}A`
              ]
            }
          ]
        }
      ];
      
      allSemesterCourses.push(...semesterCourses);
    }
    
    // Add some real course names for certain semesters
    const realCourseNames = {
      '2': [
        { name: 'Differential Equations', code: 'MAT 102' },
        { name: 'Engineering Chemistry', code: 'CYT 100' },
        { name: 'Engineering Physics B', code: 'PHT 110' }
      ],
      '3': [
        { name: 'Discrete Computational Structures', code: 'CST 201' },
        { name: 'Logic System Design', code: 'CST 203' },
        { name: 'Object Oriented Programming', code: 'CST 205' }
      ],
      '4': [
        { name: 'Database Management Systems', code: 'CST 202' },
        { name: 'Operating Systems', code: 'CST 204' },
        { name: 'Design and Analysis of Algorithms', code: 'CST 206' }
      ],
      '7': [
        { name: 'Distributed Systems', code: 'CST 401' },
        { name: 'Machine Learning', code: 'CST 403' },
        { name: 'Cryptography and Network Security', code: 'CST 405' }
      ],
      '8': [
        { name: 'Data Mining and Warehousing', code: 'CST 402' },
        { name: 'Cloud Computing', code: 'CST 404' },
        { name: 'Internet of Things', code: 'CST 406' }
      ]
    };
    
    // Update courses with real names
    for (const [semester, courses] of Object.entries(realCourseNames)) {
      for (let i = 0; i < courses.length && i < 3; i++) {
        const index = (parseInt(semester) - 1) * 3 + i;
        if (index < allSemesterCourses.length) {
          allSemesterCourses[index].name = courses[i].name;
          allSemesterCourses[index].code = courses[i].code;
        }
      }
    }
    
    // Import each course
    console.log('Importing courses for all semesters...');
    let courseCount = 0;
    let moduleCount = 0;
    let topicCount = 0;
    
    for (const courseData of allSemesterCourses) {
      // Check if course already exists
      const existingCourse = await Course.findOne({ 
        name: courseData.name,
        semester: courseData.semester,
        branch: courseData.branch
      });
      
      if (existingCourse) {
        console.log(`Skipping duplicate course: ${courseData.name}`);
        continue;
      }
      
      console.log(`Importing course: ${courseData.name} (${courseData.code}) - Semester ${courseData.semester}`);
      
      // Create course
      const course = new Course({
        name: courseData.name,
        code: courseData.code,
        semester: courseData.semester,
        branch: courseData.branch,
        modules: []
      });
      
      // Save course to get an _id
      await course.save();
      courseCount++;
      
      // Process modules
      console.log(`Adding ${courseData.modules.length} modules for course ${courseData.name}`);
      
      for (const moduleData of courseData.modules) {
        console.log(`  - Adding module: ${moduleData.name}`);
        
        // Create module
        const module = new Module({
          name: moduleData.name,
          courseId: course._id,
          topics: moduleData.topics
        });
        
        // Save module
        await module.save();
        moduleCount++;
        topicCount += moduleData.topics.length;
        
        // Add module to course
        course.modules.push(module._id);
      }
      
      // Update course with modules
      await course.save();
    }
    
    console.log('\n=== IMPORT SUMMARY ===');
    console.log(`Imported ${courseCount} courses across all semesters`);
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
importAllSemesters(); 