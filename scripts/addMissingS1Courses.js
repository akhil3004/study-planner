// Script to add missing Semester 1 courses (Engineering Chemistry and Life Skills)
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function addMissingS1Courses() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Define missing semester 1 courses
    const missingCourses = [
      {
        name: 'Engineering Chemistry',
        code: 'CYT 100',
        semester: '1',
        branch: 'Computer Science and Engineering',
        modules: [
          {
            name: 'Electrochemistry',
            topics: [
              'Introduction to electrochemistry, Electrochemical cells, Electrode potential, Measurement of electrode potential',
              'Nernst equation and application, Reference electrodes, SHE, Calomel electrode, Glass electrode',
              'Electrochemical series and its applications, Concentration cell, Batteries - Primary and secondary',
              'Lead-acid battery, Lithium-ion battery, Fuel cells - H2-O2 fuel cell, Applications of fuel cells',
              'Corrosion as an electrochemical process, Types of corrosion, Differential metal corrosion, Differential aeration corrosion',
              'Factors affecting corrosion, Corrosion protection, Sacrificial anodes and cathodic protection'
            ]
          },
          {
            name: 'Spectroscopic Techniques and Applications',
            topics: [
              'Introduction to spectroscopy, Electromagnetic spectrum, Molecular energy levels',
              'UV-visible spectroscopy, Beer-Lambert\'s law, Instrumentation of UV-visible spectroscopy',
              'IR spectroscopy, Instrumentation and applications, Molecular structural determination',
              'NMR spectroscopy, Proton NMR, Chemical shift, Spin-spin splitting',
              'NMR instrumentation, Applications in medical field - MRI',
              'Principle and applications of mass spectroscopy, Basic instrumentation'
            ]
          },
          {
            name: 'Polymer Chemistry',
            topics: [
              'Introduction to polymers, Classification, Types of polymerization - Addition, Condensation',
              'Coordination polymerization, Mechanism of polymerization',
              'Molecular weight of polymers, Number average and weight average molecular weight',
              'Plastics - Thermoplastics and Thermosetting resins, Compounding of plastics',
              'Polymer Processing - Injection molding, Extrusion molding, Blow molding',
              'Adhesives, Elastomers, Natural and synthetic rubber'
            ]
          },
          {
            name: 'Water Technology and Nanomaterials',
            topics: [
              'Water characteristics, Hardness, Types of hardness, Degree of hardness',
              'Water treatment for domestic use, Disinfection methods - chlorination, ozonation, UV irradiation',
              'Boiler feed water, Issues with boiler feed water, Internal treatments for boiler problems',
              'Desalination - Reverse osmosis and electrodialysis',
              'Introduction to nanomaterials, Classification of nanomaterials, Properties at nanoscale',
              'Applications of nanomaterials, Fullerenes, Carbon nanotubes, Applications of carbon nanotubes'
            ]
          },
          {
            name: 'Environmental Chemistry and Instrumental Methods',
            topics: [
              'Environmental pollution, Air pollution, Water pollution, Soil pollution',
              'Air pollutants - COx, NOx, SOx, Particulate matter, Greenhouse effect, Ozone layer depletion',
              'Water quality parameters - BOD, COD, DO, TDS',
              'Instrumental methods of analysis, Thermal analysis, TGA, DTA, DSC',
              'Chromatography, Gas chromatography, HPLC, Ion-exchange chromatography',
              'Basic principles and applications of atomic absorption spectroscopy and atomic emission spectroscopy'
            ]
          }
        ]
      },
      {
        name: 'Life Skills',
        code: 'HUT 110',
        semester: '1',
        branch: 'Computer Science and Engineering',
        modules: [
          {
            name: 'Overview of Life Skills',
            topics: [
              'Meaning and significance of life skills',
              'Life skills identified by WHO: Self-awareness, Empathy, Critical thinking, Creative thinking, Decision making, problem solving, Effective communication, interpersonal relationship, coping with stress, coping with emotion',
              'Life skills for professionals: positive thinking, right attitude, attention to detail, having the big picture, learning skills, research skills, perseverance, setting goals, leadership, motivation, personality development, IQ, EQ, and SQ'
            ]
          },
          {
            name: 'Self-awareness and Stress Management',
            topics: [
              'Self-awareness: definition, need for self-awareness; Coping With Stress and Emotions, Human Values',
              'Tools and techniques of self-awareness: questionnaires, journaling, reflective questions, meditation, mindfulness, psychometric tests, feedback',
              'Stress Management: Stress, reasons and effects, identifying stress, stress diaries, the four A\'s of stress management, techniques, resilience, Gratitude Training',
              'Coping with emotions: Identifying and managing emotions, harmful ways of dealing with emotions, PATH method and relaxation techniques',
              'Morals, Values and Ethics: Integrity, Civic Virtue, Respect for Others, Living Peacefully, Caring, Sharing, Honesty, Courage, Valuing Time, Time management, Co operation, Commitment, Empathy, Self-Confidence, Character, Spirituality, Avoiding Procrastination, Sense of Engineering Ethics'
            ]
          },
          {
            name: '21st Century Skills',
            topics: [
              '21st century skills: Creativity, Critical Thinking, Collaboration, Problem Solving, Decision Making, Need for Creativity in the 21st century',
              'Imagination, Intuition, Experience, Sources of Creativity, Lateral Thinking, Myths of creativity',
              'Critical thinking Vs Creative thinking, Functions of Left Brain & Right brain, Convergent & Divergent Thinking, Critical reading & Multiple Intelligence',
              'Steps in problem solving: Problem Solving Techniques, Six Thinking Hats, Mind Mapping, Forced Connections',
              'Analytical Thinking, Numeric, symbolic, and graphic reasoning, Scientific temperament and Logical thinking'
            ]
          },
          {
            name: 'Communication and Professional Ethics',
            topics: [
              'Communication: definition, meaning, types, barriers, effective communication, impact of body language',
              'Active listening: listening vs hearing, steps to active listening, barriers to active listening, empathic listening',
              'Effective presentation skills, Public speaking, Extempore speaking, Creating effective presentations, Group discussions',
              'Professional ethics: definition, types, engineering ethics, professional codes of ethics, ethical dilemmas',
              'Environmental ethics: Introduction, environmental values, bringing values to the real world, environmental ethical principles'
            ]
          },
          {
            name: 'Leadership and Teamwork',
            topics: [
              'Leadership: definition, styles, traits, vision, cultural dimensions of leadership',
              'Emotional intelligence: definition, importance, components, emotional quotient, building emotional intelligence',
              'Teamwork: definition, importance, characteristics of effective teams, stages of team development',
              'Group dynamics: definition, types of groups, group norms, group cohesiveness, barriers to effective teams',
              'Case studies on leadership and teamwork in engineering scenarios, Engineering projects as team exercises'
            ]
          }
        ]
      }
    ];

    // Import each missing semester 1 course
    console.log('Adding missing Semester 1 courses...');
    let moduleCount = 0;
    let topicCount = 0;

    for (const courseData of missingCourses) {
      // Check if course already exists
      const existingCourse = await Course.findOne({ 
        name: courseData.name,
        semester: courseData.semester,
        branch: courseData.branch
      });

      if (existingCourse) {
        console.log(`Course already exists: ${courseData.name}`);
        
        // Delete the existing course to avoid duplication
        console.log(`Deleting existing course: ${courseData.name} to re-import properly`);
        
        // Delete associated modules first
        for (const moduleId of existingCourse.modules) {
          await Module.findByIdAndDelete(moduleId);
        }
        
        // Delete the course
        await Course.findByIdAndDelete(existingCourse._id);
        console.log(`Course and its modules deleted: ${courseData.name}`);
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
    console.log(`Added ${missingCourses.length} missing Semester 1 courses`);
    console.log(`Added ${moduleCount} modules`);
    console.log(`Added ${topicCount} topics`);
    console.log('========================');
    
  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nMongoDB Disconnected');
  }
}

// Run the import
addMissingS1Courses(); 