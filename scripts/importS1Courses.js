// Script to import Semester 1 courses
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Module = require('../models/Module');

async function importS1Courses() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Define semester 1 courses
    const semester1Courses = [
      {
        name: 'Linear Algebra and Calculus',
        code: 'MAT 101',
        semester: '1',
        branch: 'Computer Science and Engineering',
        modules: [
          {
            name: 'Linear algebra',
            topics: [
              'Systems of linear equations, Solution by Gauss elimination, row echelon form and rank of a matrix',
              'Fundamental theorem for linear systems (homogeneous and non-homogeneous, without proof)',
              'Eigen values and eigen vectors',
              'Diagonaliztion of matrices, orthogonal transformation, quadratic forms and their canonical forms'
            ]
          },
          {
            name: 'Multivariable calculus-Differentiation',
            topics: [
              'Concept of limit and continuity of functions of two variables, partial derivatives, Differentials',
              'Local Linear approximations, chain rule, total derivative',
              'Relative maxima and minima, Absolute maxima and minima on closed and bounded set'
            ]
          },
          {
            name: 'Multivariable calculus-Integration',
            topics: [
              'Double integrals (Cartesian), reversing the order of integration',
              'Change of coordinates (Cartesian to polar), finding areas and volume using double integrals',
              'Mass and centre of gravity of inhomogeneous laminas using double integral',
              'Triple integrals, volume calculated as triple integral, triple integral in cylindrical and spherical coordinates'
            ]
          },
          {
            name: 'Sequences and series',
            topics: [
              'Convergence of sequences and series, convergence of geometric series and p-series(without proof)',
              'Test of convergence (comparison, ratio and root tests without proof)',
              'Alternating series and Leibnitz test, absolute and conditional convergence'
            ]
          },
          {
            name: 'Series representation of functions',
            topics: [
              'Taylor series (without proof, assuming the possibility of power series expansion in appropriate domains)',
              'Binomial series and series representation of exponential, trigonometric, logarithmic functions',
              'Fourier series, Euler formulas, Convergence of Fourier series (without proof)',
              'Half range sine and cosine series, Parseval\'s theorem (without proof)'
            ]
          }
        ]
      },
      {
        name: 'Engineering Physics A',
        code: 'PHT 100',
        semester: '1',
        branch: 'Computer Science and Engineering',
        modules: [
          {
            name: 'Oscillations and Waves',
            topics: [
              'Harmonic oscillations, Damped harmonic motion-Derivation of differential equation and its solution',
              'Over damped, Critically damped and Under damped Cases, Quality factor-Expression',
              'Forced oscillations-Differential Equation-Derivation of expressions for amplitude and phase',
              'Amplitude Resonance-Expression for Resonant frequency, Quality factor and Sharpness of Resonance',
              'Electrical analogy of mechanical oscillators',
              'Wave motion- Derivation of one dimensional wave equation and its solution',
              'Three dimensional wave equation and its solution (no derivation)',
              'Distinction between transverse and longitudinal waves, Transverse vibration in a stretched string',
              'Statement of laws of vibration'
            ]
          },
          {
            name: 'Wave Optics',
            topics: [
              'Interference of light-Principle of superposition of waves, Theory of thin films - Cosine law',
              'Derivation of the conditions of constructive and destructive Interference',
              'Interference due to wedge shaped films, Newton\'s rings',
              'Measurement of wavelength and refractive index, Antireflection coatings',
              'Diffraction of light, Fresnel and Fraunhofer classes of diffraction',
              'Diffraction grating-Grating equation, Rayleigh criterion for limit of resolution',
              'Resolving and Dispersive power of a grating with expression'
            ]
          },
          {
            name: 'Quantum Mechanics & Nanotechnology',
            topics: [
              'Introduction for the need of Quantum mechanics, Wave nature of Particles, Uncertainty principle',
              'Applications-Absence of electrons inside a nucleus and Natural line broadening mechanism',
              'Formulation of time dependent and independent Schrodinger wave equations',
              'Physical meaning of wave function, Particle in a one dimensional box',
              'Quantum Mechanical Tunnelling (Qualitative)',
              'Introduction to nanoscience and technology, Increase in surface to volume ratio for nanomaterials',
              'Quantum confinement, Properties of nanomaterials-mechanical, electrical and optical',
              'Applications of nanotechnology'
            ]
          },
          {
            name: 'Magnetism & Electro Magnetic Theory',
            topics: [
              'Magnetic field and Magnetic flux density, Gauss\'s law for Magnetic flux density',
              'Ampere\'s Circuital law, Faraday\'s law in terms of EMF produced by changing magnetic flux',
              'Magnetic permeability and susceptibility, Classification of magnetic materials',
              'Fundamentals of vector calculus, concept of divergence, gradient and curl with physical significance',
              'Line, Surface and Volume integrals, Gauss divergence theorem & Stokes\' theorem',
              'Equation of continuity, Derivation of Maxwell\'s equations in vacuum',
              'Comparison of displacement current with conduction current',
              'Electromagnetic waves, Velocity of Electromagnetic waves in free space, Flow of energy and Poynting\'s vector'
            ]
          },
          {
            name: 'Superconductivity & Photonics',
            topics: [
              'Superconducting phenomena, Meissner effect and perfect diamagnetism',
              'Types of superconductors-Type I and Type II, BCS Theory (Qualitative)',
              'High temperature superconductors-Applications of super conductivity',
              'Introduction to photonics-Photonic devices-Light Emitting Diode, Photo detectors',
              'Junction and PIN photodiodes, Solar cells-I-V Characteristics',
              'Optic fibre-Principle of propagation of light, Types of fibres-Step index and Graded index fibres',
              'Numerical aperture-Derivation, Fibre optic communication system (block diagram)',
              'Applications of optical fibre, Fibre optic sensors-Intensity Modulated and Phase modulated sensors'
            ]
          }
        ]
      },
      {
        name: 'Engineering Graphics',
        code: 'EST 110',
        semester: '1',
        branch: 'Computer Science and Engineering',
        modules: [
          {
            name: 'Introduction and Fundamentals',
            topics: [
              'Introduction: Relevance of technical drawing in engineering field',
              'Types of lines, Dimensioning, BIS code of practice for technical drawing',
              'Orthographic projection of Points and Lines',
              'Projection of points in different quadrants, Projection of straight lines',
              'Trace of line, Inclination of lines with reference planes, True length of line'
            ]
          },
          {
            name: 'Orthographic Projection of Solids',
            topics: [
              'Projection of Simple solids such as Triangular, Rectangle, Square, Pentagonal and Hexagonal Prisms, Pyramids, Cone and Cylinder',
              'Projection of solids in simple position including profile view',
              'Projection of solids with axis inclined to one or both reference planes'
            ]
          },
          {
            name: 'Sections and Development',
            topics: [
              'Sections of Prisms, Pyramids, Cone, Cylinder with axis in vertical position and cut by different section planes',
              'True shape of the sections, Locating the section plane when the true shape of the section is given',
              'Development of Surfaces',
              'Development of surfaces of solids and solids cut by different section planes',
              'Finding the shortest distance between two points on the surface'
            ]
          },
          {
            name: 'Isometric Projection',
            topics: [
              'Isometric View and Projections of Prisms, Pyramids, Cone, Cylinder',
              'Frustum of Pyramid, Frustum of Cone, Sphere, Hemisphere and their combinations'
            ]
          },
          {
            name: 'Perspective and Conversion',
            topics: [
              'Perspective projection of Prisms and Pyramids with axis perpendicular to the ground plane',
              'Axis perpendicular to picture plane',
              'Conversion of Pictorial Views',
              'Conversion of pictorial views into orthographic views'
            ]
          }
        ]
      },
      {
        name: 'Engineering Mechanics',
        code: 'EST 100',
        semester: '1',
        branch: 'Computer Science and Engineering',
        modules: [
          {
            name: 'Introduction to Engineering Mechanics',
            topics: [
              'Introduction to Engineering Mechanics - statics - basic principles of statics',
              'Parallelogram law, equilibrium law, principles of superposition and transmissibility',
              'Law of action and reaction, free body diagrams',
              'Concurrent coplanar forces - composition and resolution of forces',
              'Resultant and equilibrium equations - methods of projections - methods of moments',
              'Varignon\'s Theorem of moments'
            ]
          },
          {
            name: 'Friction and Forces',
            topics: [
              'Friction - sliding friction - Coulomb\'s laws of friction',
              'Analysis of single bodies - wedges, ladder',
              'Analysis of connected bodies',
              'Parallel coplanar forces - couple - resultant of parallel forces - centre of parallel forces',
              'Equilibrium of parallel forces - Simple beam subject to concentrated vertical loads',
              'General coplanar force system - resultant and equilibrium equations'
            ]
          },
          {
            name: 'Centroid and Moment of Inertia',
            topics: [
              'Centroid of composite areas - moment of inertia',
              'Parallel axis and perpendicular axis theorems',
              'Polar moment of inertia, radius of gyration, mass moment of inertia',
              'Ring, cylinder and disc',
              'Theorem of Pappus Guldinus (demonstration only)',
              'Forces in space - vectorial representation of forces, moments and couples',
              'Resultant and equilibrium equations - concurrent forces in space'
            ]
          },
          {
            name: 'Dynamics - Translation',
            topics: [
              'Dynamics - rectilinear translation - equations of kinematics',
              'Kinetics - equation of motion - D\'Alembert\'s principle',
              'Motion on horizontal and inclined surfaces, motion of connected bodies',
              'Impulse momentum equation and work energy equation',
              'Curvilinear translation - equations of kinematics - projectile motion',
              'Kinetics - equation of motion, Moment of momentum and work energy equation'
            ]
          },
          {
            name: 'Rotation and Vibration',
            topics: [
              'Rotation - kinematics of rotation',
              'Equation of motion for a rigid body rotating about a fixed axis',
              'Rotation under a constant moment',
              'Plane motion of rigid body - instantaneous centre of rotation',
              'Simple harmonic motion - free vibration - degree of freedom',
              'Undamped free vibration of spring mass system - effect of damping'
            ]
          }
        ]
      },
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

    // Import each semester 1 course
    console.log('Importing Semester 1 courses...');
    let moduleCount = 0;
    let topicCount = 0;

    for (const courseData of semester1Courses) {
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
    console.log(`Imported ${semester1Courses.length} Semester 1 courses`);
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
importS1Courses(); 