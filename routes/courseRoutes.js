const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

// Apply authentication middleware to all routes
router.use(authController.isAuthenticated);

// Get all semesters
router.get('/semesters', (req, res) => {
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  res.render('semester', { semesters, page: 'courses' });
});

// Get branches for a semester
router.get('/semester/:semester/branches', (req, res) => {
  const semester = req.params.semester;
  const branches = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
  ];
  res.render('branch', { semester, branches, page: 'courses' });
});

// Get courses for a semester and branch
router.get('/semester/:semester/branch/:branch', (req, res) => {
  const semester = req.params.semester;
  const branch = decodeURIComponent(req.params.branch);
  const courses = [];

  if (semester === '1' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Linear Algebra and Calculus',
        code: 'MAT 101',
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
        modules: [
          {
            name: 'Introduction and Basic Concepts',
            topics: [
              'Relevance of technical drawing in engineering field',
              'Types of lines, Dimensioning, BIS code of practice for technical drawing',
              'Orthographic projection of Points and Lines',
              'Projection of points in different quadrants, Projection of straight lines',
              'Trace of line, Inclination of lines with reference planes, True length of line'
            ]
          },
          {
            name: 'Orthographic projection of Solids',
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
              'Development of surfaces of solids and solids cut by different section planes',
              'Finding the shortest distance between two points on the surface'
            ]
          },
          {
            name: 'Isometric Projection',
            topics: [
              'Isometric View and Projections of Prisms, Pyramids, Cone, Cylinder, Frustum of Pyramid, Frustum of Cone, Sphere, Hemisphere and their combinations'
            ]
          },
          {
            name: 'Perspective Projection and Conversion',
            topics: [
              'Perspective projection of Prisms and Pyramids with axis perpendicular to the ground plane, axis perpendicular to picture plane',
              'Conversion of pictorial views into orthographic views'
            ]
          }
        ]
      },
      {
        name: 'Life Skills',
        code: 'HUT 110',
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
            name: 'Group and Team Dynamics',
            topics: [
              'Introduction to Groups: Composition, formation, Cycle, thinking, Clarifying expectations, Problem Solving, Consensus',
              'Dynamics techniques, Group vs Team, Team Dynamics, Virtual Teams',
              'Managing team performance and managing conflicts, Intrapreneurship'
            ]
          },
          {
            name: 'Leadership',
            topics: [
              'Leadership framework, entrepreneurial and moral leadership, vision, cultural dimensions',
              'Growing as a leader, turnaround leadership, managing diverse stakeholders, crisis management',
              'Types of Leadership, Traits, Styles, VUCA Leadership, Levels of Leadership, Transactional vs Transformational Leaders, Leadership Grid, Effective Leaders'
            ]
          }
        ]
      },
      {
        name: 'Engineering Chemistry',
        code: 'CYT 100',
        modules: [
          {
            name: 'Electrochemistry and Corrosion',
            topics: [
              'Introduction - Differences between electrolytic and electrochemical cells - Daniel cell - redox reactions - cell representation',
              'Different types of electrodes (brief) - Reference electrodes - SHE - Calomel electrode - Glass Electrode - Construction and Working',
              'Single electrode potential - Helmholtz electrical double layer - Determination of E0 using calomel electrode',
              'Determination of pH using glass electrode. Electrochemical series and its applications',
              'Free energy and EMF - Nernst Equation - Derivation - single electrode and cell',
              'Potentiometric titration - Introduction - Redox titration only',
              'Lithium ion cell - construction and working',
              'Conductivity - Measurement of conductivity of a solution',
              'Corrosion - Electrochemical corrosion - mechanism, Galvanic series- cathodic protection - electroless plating - Copper and Nickel plating'
            ]
          },
          {
            name: 'Spectroscopic Techniques and Applications',
            topics: [
              'Introduction - Types of spectrum - electromagnetic spectrum - molecular energy levels - Beer Lambert\'s law',
              'UV-Visible Spectroscopy - Principle - Types of electronic transitions - Energy level diagram',
              'Instrumentation of UV-Visible spectrometer and applications',
              'IR-Spectroscopy - Principle - Number of vibrational modes - Vibrational energy states of a diatomic molecule',
              'Determination of force constant of diatomic molecule - Applications',
              '1H NMR spectroscopy - Principle - Relation between field strength and frequency - chemical shift - spin-spin splitting - coupling constant - applications of NMR- including MRI'
            ]
          },
          {
            name: 'Instrumental Methods and Nanomaterials',
            topics: [
              'Thermal analysis - TGA - Principle, instrumentation (block diagram) and applications - TGA of CaC2O4.H2O and polymers',
              'DTA - Principle, instrumentation (block diagram) and applications - DTA of CaC2O4.H2O',
              'Chromatographic methods - Basic principles and applications of column and TLC - Retention factor',
              'GC and HPLC - Principle, instrumentation (block diagram) - retention time and applications',
              'Nanomaterials - Definition - Classification - Chemical methods of preparation - Hydrolysis and Reduction',
              'Applications of nanomaterials - Surface characterisation - SEM - Principle and instrumentation'
            ]
          },
          {
            name: 'Stereochemistry and Polymer Chemistry',
            topics: [
              'Isomerism - Structural, chain, position, functional, tautomerism and matamerism - Definition with examples',
              'Representation of 3D structures - Newman, Sawhorse, Wedge and Fischer projection of substituted methane and ethane',
              'Stereoisomerism - Geometrical isomerism in double bonds and cycloalkanes (cis-trans and E-Z notations)',
              'R-S Notation - Rules and examples - Optical isomerism, Chirality, Enantiomers and Diastereoisomers',
              'Conformational analysis of ethane, butane, cyclohexane, mono and di methyl substituted cyclohexane',
              'Copolymers - Definition - Types - Random, Alternating, Block and Graft copolymers - ABS - preparation, properties and applications',
              'Kevlar - preparation, properties and applications',
              'Conducting polymers - Doping - Polyaniline and Polypyrrole - preparation properties and applications',
              'OLED - Principle, construction and advantages'
            ]
          },
          {
            name: 'Water Chemistry and Sewage Water Treatment',
            topics: [
              'Water characteristics - Hardness - Types of hardness - Temporary and Permanent - Disadvantages of hard water',
              'Units of hardness - ppm and mg/L - Degree of hardness - Estimation of hardness - EDTA method',
              'Water softening methods - Ion exchange process - Principle, procedure and advantages',
              'Reverse osmosis - principle, process and advantages',
              'Municipal water treatment (brief) - Disinfection methods - chlorination, ozone and UV irradiation',
              'Dissolved oxygen (DO) - Estimation (Winkler\'s method), BOD and COD - definition, estimation and significance',
              'Sewage water treatment - Primary, Secondary and Tertiary - Flow diagram - Trickling filter and UASB process'
            ]
          }
        ]
      },
      {
        name: 'Engineering Mechanics',
        code: 'EST 100',
        modules: [
          {
            name: 'Introduction to Engineering Mechanics',
            topics: [
              'Introduction to Engineering Mechanics - statics - basic principles of statics',
              'Parallelogram law, equilibrium law, principles of superposition and transmissibility, law of action and reaction, free body diagrams',
              'Concurrent coplanar forces - composition and resolution of forces',
              'Resultant and equilibrium equations - methods of projections - methods of moments - Varignon\'s Theorem of moments'
            ]
          },
          {
            name: 'Friction and Force Systems',
            topics: [
              'Friction - sliding friction - Coulomb\'s laws of friction - analysis of single bodies - wedges, ladder',
              'Analysis of connected bodies',
              'Parallel coplanar forces - couple - resultant of parallel forces - centre of parallel forces',
              'Equilibrium of parallel forces - Simple beam subject to concentrated vertical loads',
              'General coplanar force system - resultant and equilibrium equations'
            ]
          },
          {
            name: 'Centroid and Moment of Inertia',
            topics: [
              'Centroid of composite areas - moment of inertia - parallel axis and perpendicular axis theorems',
              'Polar moment of inertia, radius of gyration, mass moment of inertia - ring, cylinder and disc',
              'Theorem of Pappus Guldinus (demonstration only)',
              'Forces in space - vectorial representation of forces, moments and couples',
              'Resultant and equilibrium equations - concurrent forces in space'
            ]
          },
          {
            name: 'Dynamics',
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
              'Rotation - kinematics of rotation - equation of motion for a rigid body rotating about a fixed axis',
              'Rotation under a constant moment',
              'Plane motion of rigid body - instantaneous centre of rotation',
              'Simple harmonic motion - free vibration - degree of freedom',
              'Undamped free vibration of spring mass system - effect of damping'
            ]
          }
        ]
      },
      {
        name: 'Basics of Civil & Mechanical Engineering',
        code: 'EST 120',
        modules: [
          {
            name: 'Introduction to Civil Engineering',
            topics: [
              'General Introduction to Civil Engineering: Relevance of Civil Engineering in the overall infrastructural development of the country',
              'Responsibility of an engineer in ensuring the safety of built environment',
              'Brief introduction to major disciplines of Civil Engineering',
              'Introduction to buildings: Types of buildings, selection of site for buildings, components of a residential building and their functions',
              'Building rules and regulations: Relevance of NBC, KBR & CRZ norms',
              'Building area: Plinth area, built up area, floor area, carpet area and floor area ratio for a building as per KBR'
            ]
          },
          {
            name: 'Surveying and Construction Materials',
            topics: [
              'Surveying: Importance, objectives and principles',
              'Construction materials, Conventional construction materials: types, properties and uses of building materials: bricks, stones, cement, sand and timber',
              'Cement concrete: Constituent materials, properties and types',
              'Steel: Steel sections and steel reinforcements, types and uses',
              'Modern construction materials: Architectural glass, ceramics, Plastics, composite materials, thermal and acoustic insulating materials, decorative panels, waterproofing materials, pre-fabricated building components'
            ]
          },
          {
            name: 'Building Construction',
            topics: [
              'Foundations: Bearing capacity of soil, functions of foundations, types - shallow and deep',
              'Load bearing and framed structures',
              'Brick masonry: Header and stretcher bond, English bond & Flemish bond random rubble masonry',
              'Roofs and floors: Functions, types; flooring materials',
              'Basic infrastructure services: MEP, HVAC, elevators, escalators and ramps, fire safety for buildings',
              'Green buildings: Materials, energy systems, water management and environment for green buildings'
            ]
          },
          {
            name: 'Thermodynamics and IC Engines',
            topics: [
              'Analysis of thermodynamic cycles: Carnot, Otto, Diesel cycles, Derivation of efficiency of these cycles',
              'IC Engines: CI, SI, 2-Stroke, 4-Stroke engines. Parts of different types of IC Engines',
              'Efficiencies of IC Engines, Air, Fuel, cooling and lubricating systems in SI and CI Engines, CRDI, MPFI',
              'Concept of hybrid engines'
            ]
          },
          {
            name: 'Refrigeration and Manufacturing',
            topics: [
              'Refrigeration: Unit of refrigeration, reversed Carnot cycle, COP, vapour compression cycle',
              'Definitions of dry, wet & dew point temperatures, specific humidity and relative humidity',
              'Cooling and dehumidification, Layout of unit and central air conditioners',
              'Description about working with sketches of: Reciprocating pump, Centrifugal pump, Pelton turbine, Francis turbine and Kaplan turbine',
              'Overall efficiency, Problems on calculation of input and output power of pumps and turbines',
              'Manufacturing Process: Basic description of manufacturing processes - Sand Casting, Forging, Rolling, Extrusion and their applications',
              'Metal Joining Processes: Types of welding, Arc Welding, Soldering and Brazing and their applications',
              'Basic Machining operations: Turning, Drilling, Milling and Grinding',
              'Description about working with block diagram of: Lathe, Drilling machine, Milling machine, CNC Machine',
              'Principle of CAD/CAM, Rapid and Additive manufacturing'
            ]
          }
        ]
      },
      {
        name: 'Basics of Electrical and Electronics Engineering',
        code: 'EST 130',
        modules: [
          {
            name: 'Elementary Concepts of Electric & Magnetic Circuits',
            topics: [
              'Elementary concepts of DC electric circuits: Basic Terminology including voltage, current, power, resistance, emf',
              'Resistances in series and parallel; Current and Voltage Division Rules; Capacitors & Inductors: V-I relations and energy stored',
              'Ohms Law and Kirchhoff\'s laws; Star-delta conversion',
              'Analysis of DC electric circuits: Mesh current method - Matrix representation - Solution of network equations',
              'Node voltage methods - matrix representation - solution of network equations by matrix methods'
            ]
          },
          {
            name: 'Magnetic Circuits and AC Fundamentals',
            topics: [
              'Magnetic Circuits: Basic Terminology: MMF, field strength, flux density, reluctance',
              'Comparison between electric and magnetic circuits - Series and parallel magnetic circuits with composite materials',
              'Electromagnetic Induction: Faraday\'s laws, Lenz\'s law - statically induced and dynamically induced emfs',
              'Self-inductance and mutual inductance, coefficient of coupling',
              'Alternating Current fundamentals: Generation of alternating voltages',
              'Representation of sinusoidal waveforms: frequency, period, Average, RMS values and form factor of waveforms'
            ]
          },
          {
            name: 'AC Circuits',
            topics: [
              'Phasor representation of sinusoidal quantities',
              'Trignometric, Rectangular, Polar and complex forms',
              'Analysis of simple AC circuits: Purely resistive, inductive & capacitive circuits',
              'Inductive and capacitive reactance, concept of impedance',
              'Average Power, Power factor',
              'Analysis of RL, RC and RLC series circuits - active, reactive and apparent power',
              'Three phase AC systems: Generation of three phase voltages; advantages of three phase systems',
              'Star and delta connections (balanced only), relation between line and phase voltages, line and phase currents'
            ]
          },
          {
            name: 'Introduction to Semiconductor devices',
            topics: [
              'Evolution of electronics - Vacuum tubes to nano electronics',
              'Resistors, Capacitors and Inductors: types, specifications, Standard values, color coding',
              'PN Junction diode: Intrinsic and extrinsic semiconductors, Principle of operation, V-I characteristics',
              'Principle of avalanche breakdown and working of Zener diode',
              'Bipolar Junction Transistors: PNP and NPN structures, Principle of operation',
              'Relation between current gains in CE, CB and CC, input and output characteristics of common emitter configuration'
            ]
          },
          {
            name: 'Basic electronic circuits and instrumentation',
            topics: [
              'Rectifiers and power supplies: Block diagram description of a dc power supply',
              'Working of a full wave bridge rectifier, capacitor filter, working of simple zener voltage regulator',
              'Amplifiers: Block diagram of Public Address system, Circuit diagram and working of common emitter (RC coupled) amplifier with its frequency response',
              'Concept of voltage divider biasing',
              'Electronic Instrumentation: Block diagram of an electronic instrumentation system, Working of digital multimeter'
            ]
          },
          {
            name: 'Introduction to Communication Systems',
            topics: [
              'Evolution of communication systems - Telegraphy to 5G',
              'Radio communication: principle of AM & FM, frequency bands used for various communication systems',
              'Block diagram of super heterodyne receiver, Principle of antenna - radiation from accelerated charge, working of parabolic reflector',
              'Mobile communication: basic principles of cellular communications, principle and block diagram of GSM'
            ]
          }
        ]
      }
    );
  } else if (semester === '2' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Professional Communication',
        code: 'HUT 102',
        modules: [
          {
            name: 'Use of language in communication',
            topics: [
              'Significance of technical communication',
              'Vocabulary Development: technical vocabulary, vocabulary used in formal letters/emails and reports, sequence words, misspelled words, compound words, finding suitable synonyms, paraphrasing, verbal analogies',
              'Language Development: subject-verb agreement, personal passive voice, numerical adjectives, embedded sentences, clauses, conditionals, reported speech, active/passive voice',
              'Technology-based communication: Effective email messages, slide presentations, editing skills using software',
              'Modern day research and study skills: search engines, repositories, forums such as Git Hub, Stack Exchange, OSS communities (MOOC, SWAYAM, NPTEL), and Quora; Plagiarism'
            ]
          },
          {
            name: 'Reading, Comprehension, and Summarizing',
            topics: [
              'Reading styles, speed, valuation, critical reading, reading and comprehending shorter and longer technical articles from journals, newspapers, identifying the various transitions in a text, SQ3R method, PQRST method, speed reading',
              'Comprehension: techniques, understanding textbooks, marking and underlining',
              'Note-taking: recognizing non-verbal cues'
            ]
          },
          {
            name: 'Oral Presentation',
            topics: [
              'Voice modulation, tone, describing a process',
              'Presentation Skills: Oral presentation and public speaking skills, business presentations',
              'Preparation: organizing the material, self-Introduction, introducing the topic, answering questions, individual presentation practice, presenting visuals effectively',
              'Debate and Group Discussions: introduction to Group Discussion (GD), differences between GD and debate; participating GD, understanding GD, brainstorming the topic, questioning and clarifying, GD strategies, activities to improve GD skills'
            ]
          },
          {
            name: 'Listening and Interview Skills',
            topics: [
              'Listening: Active and Passive listening, listening for general content, to fill up information, intensive listening, for specific information, to answer, and to understand',
              'Developing effective listening skills, barriers to effective listening, listening to longer technical talks, listening to classroom lectures, talks on engineering/technology, listening to documentaries and making notes, TED talks',
              'Interview Skills: types of interviews, successful interviews, interview etiquette, dress code, body language, telephone/online (skype) interviews, one-to-one interview & panel interview, FAQs related to job interviews'
            ]
          },
          {
            name: 'Formal writing',
            topics: [
              'Technical Writing: differences between technical and literary style',
              'Letter Writing (formal, informal and semi formal), Job applications, Minute preparation, CV preparation (differences between Bio-Data, CV and Resume), and Reports',
              'Elements of style, Common Errors in Writing',
              'Describing a process, use of sequence words, Statements of Purpose, Instructions, Checklists',
              'Analytical and issue-based Essays and Report Writing: basics of report writing; Referencing Style (IEEE Format), structure of a report; types of reports, references, bibliography'
            ]
          }
        ]
      },
      {
        name: 'Vector Calculus, Differential Equations and Transforms',
        code: 'MAT 102',
        modules: [
          {
            name: 'Calculus of vector functions',
            topics: [
              'Vector valued function of single variable, derivative of vector function and geometrical interpretation',
              'Motion along a curve - velocity, speed and acceleration',
              'Concept of scalar and vector fields, Gradient and its properties, directional derivative, divergence and curl',
              'Line integrals of vector fields, work as line integral',
              'Conservative vector fields, independence of path and potential function'
            ]
          },
          {
            name: 'Vector integral theorems',
            topics: [
              'Green\'s theorem (for simply connected domains, without proof) and applications to evaluating line integrals and finding areas',
              'Surface integrals over surfaces of the form z = g(x, y), y = g(x, z) or x = g(y, z)',
              'Flux integrals over surfaces, divergence theorem (without proof) and its applications to finding flux integrals',
              'Stokes\' theorem (without proof) and its applications to finding line integrals of vector fields and work done'
            ]
          },
          {
            name: 'Ordinary differential equations',
            topics: [
              'Homogenous linear differential equation of second order, superposition principle, general solution',
              'Homogenous linear ODEs with constant coefficients - general solution',
              'Solution of Euler-Cauchy equations (second order only)',
              'Existence and uniqueness (without proof)',
              'Non homogenous linear ODEs - general solution, solution by the method of undetermined coefficients, methods of variation of parameters',
              'Solution of higher order equations - homogeneous and non-homogeneous with constant coefficient using method of undetermined coefficient'
            ]
          },
          {
            name: 'Laplace transforms',
            topics: [
              'Laplace Transform and its inverse, Existence theorem (without proof), linearity',
              'Laplace transform of basic functions, first shifting theorem',
              'Laplace transform of derivatives and integrals, solution of differential equations using Laplace transform',
              'Unit step function, Second shifting theorems',
              'Dirac delta function and its Laplace transform',
              'Solution of ordinary differential equation involving unit step function and Dirac delta functions',
              'Convolution theorem (without proof) and its application to finding inverse Laplace transform of products of functions'
            ]
          },
          {
            name: 'Fourier Transforms',
            topics: [
              'Fourier integral representation, Fourier sine and cosine integrals',
              'Fourier sine and cosine transforms, inverse sine and cosine transform',
              'Fourier transform and inverse Fourier transform, basic properties',
              'The Fourier transform of derivatives',
              'Convolution theorem (without proof)'
            ]
          }
        ]
      },
      {
        name: 'Programming in C',
        code: 'EST 102',
        modules: [
          {
            name: 'Basics of Computer Hardware and Software',
            topics: [
              'Basics of Computer Architecture: processor, Memory, Input & Output devices',
              'Application Software & System software: Compilers, interpreters, High level and low level languages',
              'Introduction to structured approach to programming, Flow chart Algorithms, Pseudo code (bubble sort, linear search - algorithms and pseudocode)'
            ]
          },
          {
            name: 'Program Basics',
            topics: [
              'Basic structure of C program: Character set, Tokens, Identifiers in C, Variables and Data Types, Constants, Console IO Operations, printf and scanf',
              'Operators and Expressions: Expressions and Arithmetic Operators, Relational and Logical Operators, Conditional operator, size of operator, Assignment operators and Bitwise Operators, Operators Precedence',
              'Control Flow Statements: If Statement, Switch Statement, Unconditional Branching using goto statement, While Loop, Do While Loop, For Loop, Break and Continue statements'
            ]
          },
          {
            name: 'Arrays and strings',
            topics: [
              'Arrays Declaration and Initialization, 1-Dimensional Array, 2-Dimensional Array',
              'String processing: In built String handling functions (strlen, strcpy, strcat and strcmp, puts, gets)',
              'Linear search program, bubble sort program, simple programs covering arrays and strings'
            ]
          },
          {
            name: 'Working with functions',
            topics: [
              'Introduction to modular programming, writing functions, formal parameters, actual parameters',
              'Pass by Value, Recursion, Arrays as Function Parameters structure, union, Storage Classes',
              'Scope and life time of variables, simple programs using functions'
            ]
          },
          {
            name: 'Pointers and Files',
            topics: [
              'Basics of Pointer: declaring pointers, accessing data though pointers, NULL pointer, array access using pointers, pass by reference effect',
              'File Operations: open, close, read, write, append',
              'Sequential access and random access to files: In built file handling functions (rewind(), fseek(), ftell(), feof(), fread(), fwrite())'
            ]
          }
        ]
      }
    );
  } else if (semester === '3' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Discrete Mathematical Structures',
        code: 'MAT 203',
        modules: [
          {
            name: 'Fundamentals of Logic',
            topics: [
              'Mathematical logic, Basic Connectives and Truth Table',
              'Statements, Logical Connectives, Tautology, Contradiction',
              'Logical Equivalence, The Laws of Logic',
              'The Principle of duality, Substitution Rules',
              'The implication, The Contrapositive, the Converse, the Inverse',
              'Logical Implication, Rules of Inference',
              'The use of Quantifiers, Open Statement, Quantifier, Negation',
              'Logically Equivalent, Contrapositive, The Converse, The Inverse',
              'Logical Implications'
            ]
          },
          {
            name: 'Fundamentals of Counting Theory',
            topics: [
              'The Pigeon-hole Principle',
              'The Rule of Sum',
              'Extension of Sum Rule',
              'The Rule of Product',
              'Extension of Product Rule, Permutations',
              'Combinations, Combination with repetition',
              'The Binomial Theorem',
              'The Principle of Inclusion and Exclusion Theorem',
              'Derangements'
            ]
          },
          {
            name: 'Relations and Functions',
            topics: [
              'Cartesian Product, Binary Relation, Function, Domain, Range, One to One Function Image - Restriction',
              'Properties, Reachability Relations, Reflexive Relations, Symmetric Relations, Transitive relations, Antisymmetric Relations',
              'Partial Order relations',
              'Equivalence Relation, Irreflexive Relations',
              'Partially ordered Set, Hasse Diagram',
              'Maximal-Minimal Element, Least Upper bound, Greatest Lower Bound',
              'Equivalence Relations and Partitions, Equivalence Class',
              'Lattice- Dual Lattice, sub lattice, Properties of glb and lub',
              'Properties of Lattice, Special Lattice, Complete Lattice, Bounded Lattice, Completed Lattice, Distributive Lattice'
            ]
          },
          {
            name: 'Generating Functions and Recurrence Relations',
            topics: [
              'Generating Function, Definition and Examples',
              'Exponential Generating Function',
              'First Order Linear Recurrence Relations with Constant Coefficients',
              'Homogeneous Solution',
              'Non homogeneous Solution',
              'Second order linear recurrence relations with constant coefficients',
              'Homogeneous Solution',
              'Non homogeneous Solution'
            ]
          },
          {
            name: 'Algebraic Structures',
            topics: [
              'Algebraic System-Properties, Homomorphism and Isomorphism',
              'Semi group, Monoid, Cyclic monoid',
              'Sub semigroup and sub monoid',
              'Homomorphism and Isomorphism of Semigroup, Monoids and Groups',
              'Elementary Properties, Subgroup, Symmetric group on three symbols',
              'The direct Product of two Groups',
              'Group Homomorphism, Isomorphism, Cyclic group',
              'Right coset, Left coset',
              'Lagrange\'s Theorem'
            ]
          }
        ]
      },
      {
        name: 'Professional Ethics',
        code: 'HUT 200',
        modules: [
          {
            name: 'Human Values',
            topics: [
              'Morals, values and Ethics, Integrity, Academic Integrity, Work Ethics',
              'Service Learning, Civic Virtue, Respect for others, Living peacefully',
              'Caring and Sharing, Honesty, Courage, Co-operation commitment',
              'Empathy, Self Confidence, Social Expectations'
            ]
          },
          {
            name: 'Engineering Ethics & Professionalism',
            topics: [
              'Senses of Engineering Ethics, Variety of moral issues, Types of inquiry',
              'Moral dilemmas, Moral Autonomy, Kohlberg\'s theory',
              'Gilligan\'s theory, Consensus and Controversy, Profession & Professionalism, Models of professional roles, Theories about right action',
              'Self interest-Customs and Religion, Uses of Ethical Theories'
            ]
          },
          {
            name: 'Engineering as social Experimentation',
            topics: [
              'Engineering as Experimentation, Engineers as responsible Experimenters',
              'Codes of Ethics, Plagiarism, A balanced outlook on law',
              'Challenger case study, Bhopal gas tragedy'
            ]
          },
          {
            name: 'Responsibilities and Rights',
            topics: [
              'Collegiality and loyalty, Managing conflict, Respect for authority',
              'Collective bargaining, Confidentiality, Role of confidentiality in moral integrity, Conflicts of interest',
              'Occupational crime, Professional rights, Employee right, IPR Discrimination'
            ]
          },
          {
            name: 'Global Ethical Issues',
            topics: [
              'Multinational Corporations, Environmental Ethics, Business Ethics, Computer Ethics',
              'Role in Technological Development, Moral leadership',
              'Engineers as Managers, Consulting Engineers, Engineers as Expert witnesses and advisors'
            ]
          }
        ]
      },
      {
        name: 'Design and Engineering',
        code: 'EST 200',
        modules: [
          {
            name: 'Design Process',
            topics: [
              'Introduction to Design and Engineering Design',
              'Defining a Design Process: Detailing Customer Requirements',
              'Defining a Design Process: Setting Design Objectives, Identifying Constraints, Establishing Functions',
              'Defining a Design Process: Generating Design Alternatives and Choosing a Design',
              'Case Studies: Stages of Design Process'
            ]
          },
          {
            name: 'Design Thinking Approach',
            topics: [
              'Introduction to Design Thinking',
              'Iterative Design Thinking Process Stages: Empathize, Define, Ideate, Prototype and Test',
              'Design Thinking as Divergent-Convergent Questioning',
              'Design Thinking in a Team Environment',
              'Case Studies: Design Thinking Approach'
            ]
          },
          {
            name: 'Design Communication',
            topics: [
              'Communicating Designs Graphically',
              'Communicating Designs Orally and in Writing',
              'Mathematical Modelling in Design',
              'Prototyping and Proofing the Design',
              'Case Studies: Communicating Designs Graphically'
            ]
          },
          {
            name: 'Design Engineering Concepts',
            topics: [
              'Project-based Learning and Problem-based Learning in Design',
              'Modular Design and Life Cycle Design Approaches',
              'Application of Bio-mimicry, Aesthetics and Ergonomics in Design',
              'Value Engineering, Concurrent Engineering, and Reverse Engineering in Design',
              'Case Studies: Bio-mimicry based Designs'
            ]
          },
          {
            name: 'Expediency, Economics and Environment in Design Engineering',
            topics: [
              'Design for Production, Use, and Sustainability',
              'Engineering Economics in Design',
              'Design Rights',
              'Ethics in Design',
              'Case Studies: Design for Production, Use, and Sustainability'
            ]
          }
        ]
      },
      {
        name: 'Object Oriented Programming Using Java',
        code: 'CST 205',
        modules: [
          {
            name: 'Introduction',
            topics: [
              'Approaches to Software Design: Functional Oriented Design, Object-Oriented Design, Case Study of Automated Fire Alarm System',
              'Object Modeling Using UML: Basic object-oriented concepts, UML diagrams (Use case model, Class diagram, Interaction diagram, Activity diagram, State chart diagram)',
              'Introduction to Java: Programming and Runtime Environment, Development Platforms, JVM, Java compiler, Bytecode, Java applet, Java Buzzwords, Java program structure, Comments, Garbage Collection, Lexical Issues'
            ]
          },
          {
            name: 'Core Java Fundamentals',
            topics: [
              'Primitive Data types, Literals, Type Conversion and Casting, Variables, Arrays, Strings, Vector class',
              'Operators: Arithmetic, Bitwise, Relational, Boolean Logical, Assignment, Conditional (Ternary), Operator Precedence',
              'Control Statements: Selection, Iteration, Jump Statements',
              'OOP in Java: Class Fundamentals, Declaring Objects, Methods, Constructors, this Keyword, Method Overloading, Recursion, Access Control, Static Members, Final Variables, Inner Classes, Command Line Arguments, Variable Length Arguments',
              'Inheritance: Super Class, Sub Class, super keyword, protected Members, Constructors calling order, Method Overriding, Object class, Abstract Classes and Methods, final with Inheritance'
            ]
          },
          {
            name: 'More Features of Java',
            topics: [
              'Packages and Interfaces: Defining Package, CLASSPATH, Access Protection, Importing Packages, Interfaces',
              'Exception Handling: Checked/Unchecked Exceptions, try-catch, Multiple catch Clauses, Nested try, throw, throws, finally',
              'Input/Output: I/O Basics, Console Input/Output, PrintWriter, Object Streams and Serialization, Working with Files'
            ]
          },
          {
            name: 'Advanced Features of Java',
            topics: [
              'String Handling: String Constructors, String Length, Operations, Character Extraction, Comparison, Searching, Modifying Strings, valueOf(), StringBuffer vs String',
              'Collections Framework: Overview, Collection Interface, List Interface, ArrayList class, Iterator',
              'Event Handling: Mechanisms, Delegation Event Model, Event Classes, Sources, Listeners',
              'Multithreaded Programming: Java Thread Model, Main Thread, Creating Threads, Synchronization, Suspending/Resuming/Stopping Threads'
            ]
          },
          {
            name: 'GUI and Database Support',
            topics: [
              'Swing Fundamentals: Features, MVC, Controls, Components and Containers, Packages, Event Handling, Layout Managers',
              'Exploring Swings: JFrame, JLabel, Swing Buttons, JTextField',
              'JDBC Overview: Creating and Executing Queries (create, delete, insert, select)'
            ]
          }
        ]
      },
      {
        name: 'Logic System Design',
        code: 'CST 203',
        modules: [
          {
            name: 'Number Systems, Operations & Codes',
            topics: [
              'Decimal, Binary, Octal, Hexadecimal Systems, Base Conversions',
              'Binary Arithmetic: Addition, Subtraction, Multiplication, Division',
              'Representation of Negative Numbers: Complements',
              'Addition/Subtraction of BCD, Octal, Hexadecimal Numbers',
              'Binary Codes: Decimal Codes, Error Detection Codes, Reflected Code, ASCII, EBCDIC'
            ]
          },
          {
            name: 'Boolean Algebra',
            topics: [
              'Postulates, Theorems, Properties of Boolean Algebra',
              'Boolean Functions: Canonical and Standard Forms',
              'Simplification using Karnaugh Map (up to 5 variables), Don\'t care conditions, Product of sums simplification, Tabulation Method',
              'Digital Logic Gates: Basic and Universal gates, Implementation of Boolean functions'
            ]
          },
          {
            name: 'Combinational Logic Circuits',
            topics: [
              'Design and Implementation: Binary Adders and Subtractors, Binary Parallel Adder, Carry Look Ahead Adder, BCD Adder',
              'Code Converter, Magnitude Comparator, Decoder, Demultiplexer, Encoder, Multiplexer, Parity Generator/Checker'
            ]
          },
          {
            name: 'Sequential Logic Circuits',
            topics: [
              'Flip-flops: SR, JK, T, D, Master-Slave, Edge-triggered, Excitation Table, Characteristic Equations',
              'Registers: Parallel load register',
              'Counter Design: Asynchronous and Synchronous Counters (Binary, BCD, Up-Down Counters), State diagrams'
            ]
          },
          {
            name: 'Shift Registers, Arithmetic Algorithms & PLDs',
            topics: [
              'Shift Registers: Serial In Serial Out, Serial In Parallel Out, Bidirectional with Parallel Load',
              'Ring Counter, Johnson Counter: Timing Sequences, State Diagrams',
              'Arithmetic Algorithms: Addition/Subtraction in Signed Magnitude and 2\'s Complement, BCD Arithmetic, Floating Point Representation & Arithmetic',
              'Programmable Logic Devices: ROM, PLA (implementation of simple circuits)'
            ]
          }
        ]
      },
      {
        name: 'Data Structures',
        code: 'CST 201',
        modules: [
          {
            name: 'Basic Concepts of Data Structures',
            topics: [
              'System Life Cycle',
              'Algorithms and Performance Analysis: Space Complexity, Time Complexity, Asymptotic Notation',
              'Complexity Calculation of Simple Algorithms'
            ]
          },
          {
            name: 'Arrays and Searching',
            topics: [
              'Polynomial Representation using Arrays, Sparse Matrix',
              'Stacks, Queues: Circular, Priority, Double-Ended Queues',
              'Conversion & Evaluation of Expressions',
              'Searching Techniques: Linear and Binary Search'
            ]
          },
          {
            name: 'Linked List and Memory Management',
            topics: [
              'Self-Referential Structures, Dynamic Memory Allocation',
              'Linked Lists: Singly, Doubly, Circular Linked List, Operations',
              'Stacks & Queues using Linked List',
              'Polynomial Representation using Linked List',
              'Memory Allocation: First-fit, Best-fit, Worst-fit schemes'
            ]
          },
          {
            name: 'Trees and Graphs',
            topics: [
              'Trees: Binary Trees, Tree Operations, Representation, Traversals',
              'Binary Search Trees: Operations',
              'Graphs: Representation, DFS & BFS, Applications'
            ]
          },
          {
            name: 'Sorting and Hashing',
            topics: [
              'Sorting Techniques: Selection Sort, Insertion Sort, Quick Sort, Merge Sort, Heap Sort',
              'Hashing: Techniques, Collision Resolution, Overflow Handling',
              'Hash Functions: Mid Square, Division, Folding, Digit Analysis'
            ]
          }
        ]
      }
    );
  } else if (semester === '4' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Computer Organization and Architecture',
        code: 'CST 202',
        modules: [
          {
            name: 'Basic Structure of computers, Memory locations and addresses, Instruction cycle, Addressing modes, Basic processing unit',
            topics: [
              'Basic Structure of computers',
              'Memory locations and addresses',
              'Instruction cycle',
              'Addressing modes',
              'Basic processing unit'
            ]
          },
          {
            name: 'Register transfer logic, Processor organization, Arithmetic logic unit design, Status register, Shifter and accumulator design',
            topics: [
              'Register transfer logic',
              'Processor organization',
              'Arithmetic logic unit design',
              'Status register',
              'Shifter and accumulator design'
            ]
          },
          {
            name: 'Arithmetic algorithms (Multiplication, Division), Array multiplier, Booth\'s algorithm, Pipelining basics and hazards',
            topics: [
              'Arithmetic algorithms (Multiplication, Division)',
              'Array multiplier',
              'Booth\'s algorithm',
              'Pipelining basics',
              'Pipeline hazards'
            ]
          },
          {
            name: 'Control Logic Design: Hardwired and Microprogrammed control, Microprogram sequencer',
            topics: [
              'Hardwired control',
              'Microprogrammed control',
              'Microprogram sequencer'
            ]
          },
          {
            name: 'I/O Organization, Interrupts, DMA, Memory system: RAMs, ROMs, Cache (Mapping functions), CAM',
            topics: [
              'I/O Organization',
              'Interrupts',
              'DMA',
              'Memory system: RAMs, ROMs',
              'Cache (Mapping functions)',
              'CAM'
            ]
          }
        ]
      },
      {
        name: 'Database Management Systems',
        code: 'CST 204',
        modules: [
          {
            name: 'DBMS Concepts, Database Users, Data Models, Three-schema architecture, ER model',
            topics: [
              'DBMS Concepts',
              'Database Users',
              'Data Models',
              'Three-schema architecture',
              'ER model'
            ]
          },
          {
            name: 'Relational Model, Relational Algebra, SQL (DDL Commands)',
            topics: [
              'Relational Model',
              'Relational Algebra',
              'SQL (DDL Commands)'
            ]
          },
          {
            name: 'SQL DML, Nested queries, Aggregation, Views, Indexing (Single, Multi-level), B/B+ Trees, Extendible Hashing',
            topics: [
              'SQL DML',
              'Nested queries',
              'Aggregation',
              'Views',
              'Indexing (Single, Multi-level)',
              'B/B+ Trees',
              'Extendible Hashing'
            ]
          },
          {
            name: 'Normalization (1NF, 2NF, 3NF, BCNF), Functional Dependency, Lossless Join and Dependency Preservation',
            topics: [
              'Normalization (1NF, 2NF, 3NF, BCNF)',
              'Functional Dependency',
              'Lossless Join',
              'Dependency Preservation'
            ]
          },
          {
            name: 'Transactions, Concurrency Control, Locking, Recovery, Introduction to NoSQL (Key-Value DB, Document DB, Column-Family DB, Graph DB)',
            topics: [
              'Transactions',
              'Concurrency Control',
              'Locking',
              'Recovery',
              'Introduction to NoSQL',
              'Key-Value DB',
              'Document DB',
              'Column-Family DB',
              'Graph DB'
            ]
          }
        ]
      },
      {
        name: 'Operating Systems',
        code: 'CST 206',
        modules: [
          {
            name: 'OS Overview, Structure, Services, System Calls, Boot Process',
            topics: [
              'OS Overview',
              'OS Structure',
              'OS Services',
              'System Calls',
              'Boot Process'
            ]
          },
          {
            name: 'Process concepts, Process scheduling (FCFS, SJF, Priority, RR)',
            topics: [
              'Process concepts',
              'Process scheduling',
              'FCFS',
              'SJF',
              'Priority',
              'Round Robin'
            ]
          },
          {
            name: 'Process Synchronization (Peterson\'s, Mutex, Semaphore, Monitors), Deadlocks (Prevention, Banker\'s Algorithm, Detection)',
            topics: [
              'Process Synchronization',
              'Peterson\'s Algorithm',
              'Mutex',
              'Semaphore',
              'Monitors',
              'Deadlocks',
              'Prevention',
              'Banker\'s Algorithm',
              'Detection'
            ]
          },
          {
            name: 'Memory Management (Segmentation, Paging, Virtual Memory, Page Replacement Algorithms)',
            topics: [
              'Memory Management',
              'Segmentation',
              'Paging',
              'Virtual Memory',
              'Page Replacement Algorithms'
            ]
          },
          {
            name: 'File Concepts, File Operations, Storage Management (Disk Scheduling, Allocation methods)',
            topics: [
              'File Concepts',
              'File Operations',
              'Storage Management',
              'Disk Scheduling',
              'Allocation methods'
            ]
          }
        ]
      },
      {
        name: 'Graph Theory',
        code: 'MAT 206',
        modules: [
          {
            name: 'Basic Definitions, Types of Graphs, Walks, Paths, Circuits',
            topics: [
              'Basic Definitions',
              'Types of Graphs',
              'Walks',
              'Paths',
              'Circuits'
            ]
          },
          {
            name: 'Eulerian and Hamiltonian Graphs, Digraphs, Fleury\'s Algorithm',
            topics: [
              'Eulerian Graphs',
              'Hamiltonian Graphs',
              'Digraphs',
              'Fleury\'s Algorithm'
            ]
          },
          {
            name: 'Trees, Spanning Trees, Prim\'s and Kruskal\'s Algorithms, Dijkstra\'s and Floyd-Warshall\'s algorithms',
            topics: [
              'Trees',
              'Spanning Trees',
              'Prim\'s Algorithm',
              'Kruskal\'s Algorithm',
              'Dijkstra\'s Algorithm',
              'Floyd-Warshall\'s Algorithm'
            ]
          },
          {
            name: 'Connectivity, Cut Sets, Planar Graphs, Kuratowski\'s Theorem',
            topics: [
              'Connectivity',
              'Cut Sets',
              'Planar Graphs',
              'Kuratowski\'s Theorem'
            ]
          },
          {
            name: 'Graph Representations (Adjacency, Incidence, Path Matrices), Vertex Coloring, Chromatic Polynomial, Greedy Coloring',
            topics: [
              'Graph Representations',
              'Adjacency Matrix',
              'Incidence Matrix',
              'Path Matrix',
              'Vertex Coloring',
              'Chromatic Polynomial',
              'Greedy Coloring'
            ]
          }
        ]
      },
      {
        name: 'Constitution of India',
        code: 'MCN 202',
        modules: [
          {
            name: 'Definition of constitution, Historical background, Salient features, Preamble, Union and its territory, Citizenship (types and termination)',
            topics: [
              'Definition of constitution',
              'Historical background',
              'Salient features',
              'Preamble',
              'Union and its territory',
              'Citizenship (types and termination)'
            ]
          },
          {
            name: 'State definition, Fundamental Rights, Directive Principles, Fundamental Duties, Protection against convictions',
            topics: [
              'State definition',
              'Fundamental Rights',
              'Directive Principles',
              'Fundamental Duties',
              'Protection against convictions'
            ]
          },
          {
            name: 'Union Executive (President, VP, PM, AG), Parliament (Rajya Sabha, Lok Sabha, Functions), Union Judiciary (Supreme Court, Jurisdiction)',
            topics: [
              'Union Executive',
              'President',
              'Vice President',
              'Prime Minister',
              'Attorney General',
              'Parliament',
              'Rajya Sabha',
              'Lok Sabha',
              'Functions',
              'Union Judiciary',
              'Supreme Court',
              'Jurisdiction'
            ]
          },
          {
            name: 'State Executive (Governor, CM, Advocate General), State Legislature, State Judiciary (High Court)',
            topics: [
              'State Executive',
              'Governor',
              'Chief Minister',
              'Advocate General',
              'State Legislature',
              'State Judiciary',
              'High Court'
            ]
          },
          {
            name: 'Union-State Relations (Legislative, Administrative, Financial), Inter-State Council, Finance Commission, Emergency Provisions, Public Services, Official Language, Elections, Constitutional Amendments',
            topics: [
              'Union-State Relations',
              'Legislative Relations',
              'Administrative Relations',
              'Financial Relations',
              'Inter-State Council',
              'Finance Commission',
              'Emergency Provisions',
              'Public Services',
              'Official Language',
              'Elections',
              'Constitutional Amendments'
            ]
          }
        ]
      }
    );
  } else if (semester === '5' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Microprocessors and Microcontrollers',
        code: 'CST 307',
        modules: [
          {
            name: 'Evolution of microprocessors, 8085 Architecture, 8086 Architecture, Memory organization, Minimum and maximum modes, Instruction format',
            topics: [
              'Evolution of microprocessors',
              '8085 Architecture',
              '8086 Architecture',
              'Memory organization',
              'Minimum and maximum modes',
              'Instruction format'
            ]
          },
          {
            name: 'Addressing modes of 8086, Instruction set (data transfer, arithmetic, logical, string manipulation, branch), Assembly language programming, Assembler directives',
            topics: [
              'Addressing modes of 8086',
              'Instruction set',
              'Data transfer instructions',
              'Arithmetic instructions',
              'Logical instructions',
              'String manipulation instructions',
              'Branch instructions',
              'Assembly language programming',
              'Assembler directives'
            ]
          },
          {
            name: 'Stack structure in 8086, Interrupts, ISR, Interrupt programming, 8259 Architecture, Memory interfacing',
            topics: [
              'Stack structure in 8086',
              'Interrupts',
              'ISR',
              'Interrupt programming',
              '8259 Architecture',
              'Memory interfacing'
            ]
          },
          {
            name: 'Interfacing of 8255, 8254, and 8257 with 8086, Modes of operation',
            topics: [
              'Interfacing of 8255',
              'Interfacing of 8254',
              'Interfacing of 8257',
              'Modes of operation'
            ]
          },
          {
            name: '8051 Architecture, Register organization, Memory/I-O addressing, Instruction set, Assembly programming',
            topics: [
              '8051 Architecture',
              'Register organization',
              'Memory/I-O addressing',
              'Instruction set',
              'Assembly programming'
            ]
          }
        ]
      },
      {
        name: 'Formal Languages and Automata Theory',
        code: 'CST 301',
        modules: [
          {
            name: 'Alphabets, Strings, Languages, DFA, NFA, Equivalence of DFA and NFA, Regular Grammar, Equivalence of RGs and DFA',
            topics: [
              'Alphabets',
              'Strings',
              'Languages',
              'DFA',
              'NFA',
              'Equivalence of DFA and NFA',
              'Regular Grammar',
              'Equivalence of RGs and DFA'
            ]
          },
          {
            name: 'Regular Expressions, Homomorphisms, Closure properties, DFA Minimization',
            topics: [
              'Regular Expressions',
              'Homomorphisms',
              'Closure properties',
              'DFA Minimization'
            ]
          },
          {
            name: 'Myhill-Nerode Theorem, CFG, Derivation trees, Ambiguity, Normal forms',
            topics: [
              'Myhill-Nerode Theorem',
              'CFG',
              'Derivation trees',
              'Ambiguity',
              'Normal forms'
            ]
          },
          {
            name: 'PDA (Deterministic and Non-deterministic), Equivalence of PDA and CFG, Pumping lemma, Closure properties of CFLs',
            topics: [
              'PDA (Deterministic and Non-deterministic)',
              'Equivalence of PDA and CFG',
              'Pumping lemma',
              'Closure properties of CFLs'
            ]
          },
          {
            name: 'Context Sensitive Grammar, Linear Bounded Automata, Turing Machine, Recursive & Recursively Enumerable Languages, Chomsky Hierarchy',
            topics: [
              'Context Sensitive Grammar',
              'Linear Bounded Automata',
              'Turing Machine',
              'Recursive Languages',
              'Recursively Enumerable Languages',
              'Chomsky Hierarchy'
            ]
          }
        ]
      },
      {
        name: 'Disaster Management',
        code: 'MCN 301',
        modules: [
          {
            name: 'Lithosphere, Atmosphere, Hydrosphere, Biosphere, Definitions: disaster, hazard, risk, vulnerability, risk assessment, resilience, preparedness, mitigation',
            topics: [
              'Lithosphere',
              'Atmosphere',
              'Hydrosphere',
              'Biosphere',
              'Definitions: disaster, hazard, risk, vulnerability',
              'Risk assessment',
              'Resilience',
              'Preparedness',
              'Mitigation'
            ]
          },
          {
            name: 'Hazard types, Hazard mapping, Vulnerability types (physical, social, economic, environmental), Vulnerability assessment',
            topics: [
              'Hazard types',
              'Hazard mapping',
              'Vulnerability types',
              'Physical vulnerability',
              'Social vulnerability',
              'Economic vulnerability',
              'Environmental vulnerability',
              'Vulnerability assessment'
            ]
          },
          {
            name: 'Disaster Risk Management, Phases of DRM, Measures for DRR, Disaster response, Relief, International organizations',
            topics: [
              'Disaster Risk Management',
              'Phases of DRM',
              'Measures for DRR',
              'Disaster response',
              'Relief',
              'International organizations'
            ]
          },
          {
            name: 'Stakeholder engagement, Disaster communication, Capacity building (structural & non-structural), Risk reduction strategies',
            topics: [
              'Stakeholder engagement',
              'Disaster communication',
              'Capacity building',
              'Structural measures',
              'Non-structural measures',
              'Risk reduction strategies'
            ]
          },
          {
            name: 'Common disasters in India, Indian Disaster Management Policy, Institutional frameworks, Sendai Framework',
            topics: [
              'Common disasters in India',
              'Indian Disaster Management Policy',
              'Institutional frameworks',
              'Sendai Framework'
            ]
          }
        ]
      },
      {
        name: 'Management of Software Systems',
        code: 'CST 309',
        modules: [
          {
            name: 'Software process models (Waterfall, Incremental, Spiral, Agile), Agile manifesto, Agile project management, Case studies',
            topics: [
              'Software process models',
              'Waterfall model',
              'Incremental model',
              'Spiral model',
              'Agile model',
              'Agile manifesto',
              'Agile project management',
              'Case studies'
            ]
          },
          {
            name: 'Requirements engineering, SRS Template, Use cases, User stories, Personas, Scenarios, Design concepts, Architectural styles, Component-level design, IEEE Design Documentation',
            topics: [
              'Requirements engineering',
              'SRS Template',
              'Use cases',
              'User stories',
              'Personas',
              'Scenarios',
              'Design concepts',
              'Architectural styles',
              'Component-level design',
              'IEEE Design Documentation'
            ]
          },
          {
            name: 'OOD using UML, Design patterns, Open-source licensing (GPL, LGPL, BSD), Software testing (Unit, Integration, System, Black box, White box), Test automation, DevOps, CI/CD, Software maintenance',
            topics: [
              'OOD using UML',
              'Design patterns',
              'Open-source licensing',
              'GPL, LGPL, BSD',
              'Software testing',
              'Unit testing',
              'Integration testing',
              'System testing',
              'Black box testing',
              'White box testing',
              'Test automation',
              'DevOps',
              'CI/CD',
              'Software maintenance'
            ]
          },
          {
            name: 'Project Management (risk, people, teamwork), Planning, Estimation (COCOMO), Agile management (SCRUM, Kanban)',
            topics: [
              'Project Management',
              'Risk management',
              'People management',
              'Teamwork',
              'Planning',
              'Estimation (COCOMO)',
              'Agile management',
              'SCRUM',
              'Kanban'
            ]
          },
          {
            name: 'Software Quality Assurance (SQA), SPI (CMMI, ISO 9001), Cloud-based software, Virtualization, Microservices',
            topics: [
              'Software Quality Assurance (SQA)',
              'SPI',
              'CMMI',
              'ISO 9001',
              'Cloud-based software',
              'Virtualization',
              'Microservices'
            ]
          }
        ]
      },
      {
        name: 'System Software',
        code: 'CST 305',
        modules: [
          {
            name: 'System Software vs Application Software, Types of System Software, SIC & SIC/XE Architecture, Addressing modes, Instruction set, Assembler Directives',
            topics: [
              'System Software vs Application Software',
              'Types of System Software',
              'SIC & SIC/XE Architecture',
              'Addressing modes',
              'Instruction set',
              'Assembler Directives'
            ]
          },
          {
            name: 'SIC/XE Assembly Programming, Two-pass assembler, Assembler data structures, Header/Text/End records',
            topics: [
              'SIC/XE Assembly Programming',
              'Two-pass assembler',
              'Assembler data structures',
              'Header/Text/End records'
            ]
          },
          {
            name: 'Machine dependent & independent assembler features, Program relocation, Literals, Program blocks, Control sections, MASM example',
            topics: [
              'Machine dependent assembler features',
              'Machine independent assembler features',
              'Program relocation',
              'Literals',
              'Program blocks',
              'Control sections',
              'MASM example'
            ]
          },
          {
            name: 'Loader & Linker, Absolute loader, Bootstrap loader, Two-pass linking loader, Automatic library search, Loader options',
            topics: [
              'Loader & Linker',
              'Absolute loader',
              'Bootstrap loader',
              'Two-pass linking loader',
              'Automatic library search',
              'Loader options'
            ]
          },
          {
            name: 'Macro processor (definition, expansion), One-pass macro processor, Device drivers (character/block), Text editors, Debuggers (induction, deduction, backtracking)',
            topics: [
              'Macro processor',
              'Definition and expansion',
              'One-pass macro processor',
              'Device drivers',
              'Character drivers',
              'Block drivers',
              'Text editors',
              'Debuggers',
              'Induction',
              'Deduction',
              'Backtracking'
            ]
          }
        ]
      },
      {
        name: 'Computer Networks',
        code: 'CST 303',
        modules: [
          {
            name: 'Network uses, Hardware, Software, OSI & TCP/IP models, Physical Layer (topologies, encoding, media), Performance indicators (bandwidth, delay)',
            topics: [
              'Network uses',
              'Network Hardware',
              'Network Software',
              'OSI model',
              'TCP/IP model',
              'Physical Layer',
              'Topologies',
              'Encoding',
              'Media',
              'Performance indicators',
              'Bandwidth',
              'Delay'
            ]
          },
          {
            name: 'Data Link Layer (design issues, error control, sliding window), MAC protocols, Ethernet, WLAN (802.11), Bridges & Switches',
            topics: [
              'Data Link Layer',
              'Design issues',
              'Error control',
              'Sliding window',
              'MAC protocols',
              'Ethernet',
              'WLAN (802.11)',
              'Bridges & Switches'
            ]
          },
          {
            name: 'Network Layer (routing algorithms, flooding, DVR, LSR, multicast routing), Congestion control, QoS techniques',
            topics: [
              'Network Layer',
              'Routing algorithms',
              'Flooding',
              'DVR',
              'LSR',
              'Multicast routing',
              'Congestion control',
              'QoS techniques'
            ]
          },
          {
            name: 'IP protocol, ICMP, ARP, RARP, BOOTP, DHCP, OSPF, BGP, IPv6, ICMPv6',
            topics: [
              'IP protocol',
              'ICMP',
              'ARP',
              'RARP',
              'BOOTP',
              'DHCP',
              'OSPF',
              'BGP',
              'IPv6',
              'ICMPv6'
            ]
          },
          {
            name: 'Transport Layer (UDP, TCP, connection management, congestion control), Application Layer (FTP, DNS, Email, MIME, SNMP, WWW)',
            topics: [
              'Transport Layer',
              'UDP',
              'TCP',
              'Connection management',
              'Congestion control',
              'Application Layer',
              'FTP',
              'DNS',
              'Email',
              'MIME',
              'SNMP',
              'WWW'
            ]
          }
        ]
      }
    );
  } else if (semester === '6' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Industrial Economics & Foreign Trade',
        code: 'HUT 300',
        modules: [
          {
            name: 'Basic Concepts and Demand and Supply Analysis',
            topics: [
              'Scarcity and choice - Basic economic problems - PPC',
              'Firms and its objectives – types of firms',
              'Utility – Law of diminishing marginal utility',
              'Demand and its determinants – law of demand – elasticity of demand',
              'Measurement of elasticity and its applications',
              'Supply, law of supply and determinants of supply',
              'Equilibrium – Changes in demand and supply and its effects',
              'Consumer surplus and producer surplus (Concepts)',
              'Taxation and deadweight loss'
            ]
          },
          {
            name: 'Production and cost',
            topics: [
              'Production function – law of variable proportion',
              'Economies of scale – internal and external economies',
              'Isoquants, isocost line and producer\'s equilibrium – Expansion path',
              'Technical progress and its implications – Cobb-Douglas production function',
              'Cost concepts – Social cost: private cost and external cost',
              'Explicit and implicit cost – sunk cost',
              'Short run cost curves - long run cost curves',
              'Revenue (concepts) – Shutdown point – Break-even point'
            ]
          },
          {
            name: 'Market Structure',
            topics: [
              'Perfect and imperfect competition',
              'Monopoly, regulation of monopoly, monopolistic competition',
              'Oligopoly – Kinked demand curve',
              'Collusive oligopoly (meaning) – Non-price competition',
              'Product pricing – Cost plus pricing – Target return pricing',
              'Penetration pricing – Predatory pricing – Going rate pricing – Price skimming'
            ]
          },
          {
            name: 'Macroeconomic concepts',
            topics: [
              'Circular flow of economic activities',
              'Stock and flow – Final goods and intermediate goods',
              'Gross Domestic Product - National Income – Three sectors of an economy',
              'Methods of measuring national income',
              'Inflation- causes and effects – Measures to control inflation',
              'Monetary and fiscal policies',
              'Business financing- Bonds and shares',
              'Money market and Capital market – Stock market – Demat account and Trading account',
              'SENSEX and NIFTY'
            ]
          },
          {
            name: 'International Trade',
            topics: [
              'Advantages and disadvantages of international trade',
              'Absolute and Comparative advantage theory',
              'Heckscher - Ohlin theory',
              'Balance of payments – Components – Balance of Payments deficit and devaluation',
              'Trade policy – Free trade versus protection',
              'Tariff and non-tariff barriers'
            ]
          }
        ]
      },
      {
        name: 'Computer Graphics and Image Processing',
        code: 'CST 304',
        modules: [
          {
            name: 'Basics of Computer Graphics and Algorithms',
            topics: [
              'Basics of Computer Graphics and its applications',
              'Video Display devices- Refresh Cathode Ray Tubes',
              'Random Scan Displays and systems',
              'Raster scan displays and systems',
              'Line drawing algorithms- DDA, Bresenham\'s algorithm',
              'Circle drawing algorithms- Midpoint Circle generation algorithm, Bresenham\'s algorithm'
            ]
          },
          {
            name: 'Filled Area Primitives and transformations',
            topics: [
              'Filled Area Primitives- Scan line polygon filling, Boundary filling and flood filling',
              'Two dimensional transformations-Translation, Rotation, Scaling, Reflection and Shearing',
              'Composite transformations, Matrix representations and homogeneous coordinates',
              'Basic 3D transformations'
            ]
          },
          {
            name: 'Clipping and Projections',
            topics: [
              'Window to viewport transformation',
              'Cohen Sutherland Line clipping algorithm',
              'Sutherland Hodgeman Polygon clipping algorithm',
              'Three dimensional viewing pipeline',
              'Projections- Parallel and Perspective projections',
              'Visible surface detection algorithms- Depth buffer algorithm, Scan line algorithm'
            ]
          },
          {
            name: 'Fundamentals of Digital Image Processing',
            topics: [
              'Introduction to Image processing and applications',
              'Image as 2D data, Image representation in Gray scale, Binary and Colour images',
              'Fundamental steps in image processing',
              'Components of image processing system',
              'Coordinate conventions, Sampling and quantization, Spatial and Gray Level Resolution',
              'Basic relationship between pixels– neighbourhood, adjacency, connectivity',
              'Fundamentals of spatial domain-convolution operation'
            ]
          },
          {
            name: 'Image Enhancement in Spatial Domain and Image Segmentation',
            topics: [
              'Basic gray level transformation functions - Log transformations, Power-Law transformations, Contrast stretching',
              'Histogram equalization',
              'Basics of spatial filtering - Smoothing spatial filter- Linear and nonlinear filters',
              'Sharpening spatial filters-Gradient and Laplacian',
              'Fundamentals of Image Segmentation',
              'Thresholding - Basics of Intensity thresholding and Global Thresholding',
              'Region based Approach - Region Growing, Region Splitting and Merging',
              'Edge Detection - Edge Operators- Sobel and Prewitt'
            ]
          }
        ]
      },
      {
        name: 'Algorithm Analysis and Design',
        code: 'CST 306',
        modules: [
          {
            name: 'Introduction to Algorithm Analysis',
            topics: [
              'Characteristics of Algorithms',
              'Criteria for Analysing Algorithms, Time and Space Complexity',
              'Best, Worst and Average Case Complexities',
              'Asymptotic Notations - Big-Oh (O), Big-Omega (Ω), Big-Theta (Θ), Little-oh (o) and Little-Omega (ω) and their properties',
              'Classifying functions by their asymptotic growth rate',
              'Time and Space Complexity Calculation of simple algorithms',
              'Analysis of Recursive Algorithms: Recurrence Equations',
              'Solving Recurrence Equations – Iteration Method, Recursion Tree Method, Substitution method and Master\'s Theorem'
            ]
          },
          {
            name: 'Advanced Data Structures and Graph Algorithms',
            topics: [
              'Self Balancing Tree - AVL Trees (Insertion and deletion operations with all rotations)',
              'Disjoint Sets- Disjoint set operations, Union and find algorithms',
              'DFS and BFS traversals - Analysis',
              'Strongly Connected Components of a Directed graph',
              'Topological Sorting'
            ]
          },
          {
            name: 'Divide & Conquer and Greedy Strategy',
            topics: [
              'The Control Abstraction of Divide and Conquer',
              '2-way Merge sort',
              'Strassen\'s Algorithm for Matrix Multiplication-Analysis',
              'The Control Abstraction of Greedy Strategy',
              'Fractional Knapsack Problem',
              'Minimum Cost Spanning Tree Computation- Kruskal\'s Algorithms - Analysis',
              'Single Source Shortest Path Algorithm - Dijkstra\'s Algorithm-Analysis'
            ]
          },
          {
            name: 'Dynamic Programming, Back Tracking and Branch & Bound',
            topics: [
              'The Control Abstraction- The Optimality Principle',
              'Matrix Chain Multiplication-Analysis',
              'All Pairs Shortest Path Algorithm - Floyd-Warshall Algorithm-Analysis',
              'The Control Abstraction of Back Tracking – The N Queen\'s Problem',
              'Branch and Bound Algorithm for Travelling Salesman Problem'
            ]
          },
          {
            name: 'Introduction to Complexity Theory',
            topics: [
              'Tractable and Intractable Problems',
              'Complexity Classes – P, NP, NP-Hard and NP-Complete Classes',
              'NP Completeness proof of Clique Problem and Vertex Cover Problem',
              'Approximation algorithms- Bin Packing, Graph Coloring',
              'Randomized Algorithms (Definitions of Monte Carlo and Las Vegas algorithms)',
              'Randomized version of Quick Sort algorithm with analysis'
            ]
          }
        ]
      },
      {
        name: 'Compiler Design',
        code: 'CST 302',
        modules: [
          {
            name: 'Introduction to compilers and lexical analysis',
            topics: [
              'Analysis of the source program - Analysis and synthesis phases',
              'Phases of a compiler',
              'Compiler writing tools',
              'Bootstrapping',
              'Lexical Analysis - Role of Lexical Analyser',
              'Input Buffering',
              'Specification of Tokens',
              'Recognition of Tokens'
            ]
          },
          {
            name: 'Introduction to Syntax Analysis',
            topics: [
              'Role of the Syntax Analyser – Syntax error handling',
              'Review of Context Free Grammars - Derivation and Parse Trees',
              'Eliminating Ambiguity',
              'Basic parsing approaches - Eliminating left recursion, left factoring',
              'Top-Down Parsing - Recursive Descent parsing',
              'Predictive Parsing',
              'LL(1) Grammars'
            ]
          },
          {
            name: 'Bottom-Up Parsing',
            topics: [
              'Handle Pruning',
              'Shift Reduce parsing',
              'Operator precedence parsing (Concept only)',
              'LR parsing - Constructing SLR, LALR and canonical LR parsing tables'
            ]
          },
          {
            name: 'Syntax directed translation and Intermediate code generation',
            topics: [
              'Syntax directed translation - Syntax directed definitions',
              'S-attributed definitions',
              'L-attributed definitions',
              'Bottom-up evaluation of S-attributed definitions',
              'Run-Time Environments - Source Language issues',
              'Storage organization',
              'Storage-allocation strategies',
              'Intermediate Code Generation - Intermediate languages',
              'Graphical representations',
              'Three-Address code',
              'Quadruples',
              'Triples'
            ]
          },
          {
            name: 'Code Optimization and Generation',
            topics: [
              'Code Optimization - Principal sources of optimization',
              'Machine dependent and machine independent optimizations',
              'Local and global optimizations',
              'Code generation - Issues in the design of a code generator',
              'Target Language',
              'A simple code generator'
            ]
          }
        ]
      }
    );
  } else if (semester === '7' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Artificial Intelligence',
        code: 'CST 401',
        modules: [
          {
            name: 'Introduction',
            topics: [
              'What is Artificial Intelligence(AI)?',
              'The Foundations of AI',
              'History of AI',
              'Applications of AI',
              'Intelligent Agents – Agents and Environments',
              'Good behavior: The concept of rationality',
              'Nature of Environments',
              'Structure of Agents'
            ]
          },
          {
            name: 'Problem Solving',
            topics: [
              'Solving Problems by searching-Problem solving Agents',
              'Example problems',
              'Searching for solutions',
              'Uninformed search strategies',
              'Informed search strategies',
              'Heuristic functions'
            ]
          },
          {
            name: 'Search in Complex environments',
            topics: [
              'Adversarial search - Games',
              'Optimal decisions in games',
              'The Minimax algorithm',
              'Alpha-Beta pruning',
              'Constraint Satisfaction Problems – Defining CSP',
              'Constraint Propagation- inference in CSPs',
              'Backtracking search for CSPs',
              'Structure of CSP problems'
            ]
          },
          {
            name: 'Knowledge Representation and Reasoning',
            topics: [
              'Logical Agents – Knowledge based agents',
              'Logic, Propositional Logic',
              'Propositional Theorem proving',
              'Agents based on Propositional Logic',
              'First Order Predicate Logic – Syntax and Semantics',
              'Using First Order Logic',
              'Knowledge representation in First Order Logic',
              'Inference in First Order Logic – Propositional Vs First Order inference',
              'Unification and Lifting',
              'Forward chaining',
              'Backward chaining',
              'Resolution'
            ]
          },
          {
            name: 'Machine Learning',
            topics: [
              'Learning from Examples – Forms of Learning',
              'Supervised Learning',
              'Learning Decision Trees',
              'Evaluating and choosing the best hypothesis',
              'Regression and classification with Linear'
            ]
          }
        ]
      },
      {
        name: 'Industrial Safety Engineering',
        code: 'MCN 401',
        modules: [
          {
            name: 'Safety introduction',
            topics: [
              'Need for safety',
              'Safety and productivity',
              'Definitions: Accident, Injury, Unsafe act, Unsafe Condition, Dangerous Occurrence, Reportable accidents',
              'Theories of accident causation',
              'Safety organization- objectives, types, functions',
              'Role of management, supervisors, workmen, unions, government and voluntary agencies in safety',
              'Safety policy',
              'Safety Officer-responsibilities, authority',
              'Safety committee-need, types, advantages'
            ]
          },
          {
            name: 'Personal protection in work environment',
            topics: [
              'Personal protection in the work environment',
              'Types of PPEs',
              'Personal protective equipment-respiratory and non-respiratory equipment',
              'Standards related to PPEs',
              'Monitoring Safety Performance: Frequency rate, severity rate, incidence rate, activity rate',
              'Housekeeping: Responsibility of management and employees',
              'Advantages of good housekeeping',
              '5 s of housekeeping',
              'Work permit system- objectives, hot work and cold work permits',
              'Typical industrial models and methodology',
              'Entry into confined spaces'
            ]
          },
          {
            name: 'Safety issues in construction',
            topics: [
              'Introduction to construction industry and safety issues in construction',
              'Safety in various construction operations – Excavation and filling',
              'Under-water works',
              'Under-pinning & Shoring',
              'Ladders & Scaffolds',
              'Tunneling',
              'Blasting',
              'Demolition',
              'Confined space',
              'Temporary Structures',
              'Familiarization with relevant Indian Standards and the National Building Code provisions on construction safety',
              'Relevance of ergonomics in construction safety',
              'Ergonomics Hazards - Musculoskeletal Disorders and Cumulative Trauma Disorders'
            ]
          },
          {
            name: 'Safety hazards in machines',
            topics: [
              'Machinery safeguard-Point-of-Operation',
              'Principle of machine guarding -types of guards and devices',
              'Safety in turning, and grinding',
              'Welding and Cutting-Safety Precautions of Gas welding and Arc Welding',
              'Material Handling-Classification-safety consideration- manual and mechanical handling',
              'Handling assessments and techniques- lifting, carrying, pulling, pushing, palletizing and stocking',
              'Material Handling equipment-operation & maintenance',
              'Maintenance of common elements-wire rope, chains slings, hooks, clamps',
              'Hearing Conservation Program in Production industries'
            ]
          },
          {
            name: 'Hazard identification and analysis',
            topics: [
              'Hazard and risk',
              'Types of hazards –Classification of Fire',
              'Types of Fire extinguishers',
              'Fire explosion and toxic gas release',
              'Structure of hazard identification and risk assessment',
              'Identification of hazards: Inventory analysis',
              'Fire and explosion hazard rating of process plants - The Dow Fire and Explosion Hazard Index',
              'Preliminary hazard analysis',
              'Hazard and Operability study (HAZOP)) – methodology, criticality analysis, corrective action and follow-up',
              'Control of Chemical Hazards',
              'Hazardous properties of chemicals',
              'Material Safety Data Sheets (MSDS)'
            ]
          }
        ]
      }
    );
  } else if (semester === '8' && branch === 'Computer Science and Engineering') {
    courses.push(
      {
        name: 'Distributed Computing',
        code: 'CST 402',
        modules: [
          {
            name: 'Distributed systems basics and Computation model',
            topics: [
              'Distributed System – Definition, Relation to computer system components, Motivation',
              'Primitives for distributed communication',
              'Design issues, Challenges and applications',
              'A model of distributed computations – Distributed program',
              'Model of distributed executions',
              'Models of communication networks',
              'Global state of a distributed system',
              'Cuts of a distributed computation',
              'Past and future cones of an event',
              'Models of process communications'
            ]
          },
          {
            name: 'Election algorithm, Global state and Termination detection',
            topics: [
              'Logical time – A framework for a system of logical clocks',
              'Scalar time, Vector time',
              'Leader election algorithm – Bully algorithm, Ring algorithm',
              'Global state and snapshot recording algorithms – System model and definitions',
              'Snapshot algorithm for FIFO channels – Chandy Lamport algorithm',
              'Termination detection – System model of a distributed computation',
              'Termination detection using distributed snapshots',
              'Termination detection by weight throwing',
              'Spanning-tree-based algorithm'
            ]
          },
          {
            name: 'Mutual exclusion and Deadlock detection',
            topics: [
              'Distributed mutual exclusion algorithms – System model',
              'Requirements of mutual exclusion algorithm',
              'Lamport\'s algorithm',
              'Ricart–Agrawala algorithm',
              'Quorum-based mutual exclusion algorithms – Maekawa\'s algorithm',
              'Token-based algorithm – Suzuki–Kasami\'s broadcast algorithm',
              'Deadlock detection in distributed systems – System model',
              'Deadlock handling strategies',
              'Issues in deadlock detection',
              'Models of deadlocks'
            ]
          },
          {
            name: 'Distributed shared memory and Failure recovery',
            topics: [
              'Distributed shared memory – Abstraction and advantages',
              'Shared memory mutual exclusion – Lamport\'s bakery algorithm',
              'Check pointing and rollback recovery – System model',
              'Consistent and inconsistent states',
              'Different types of messages',
              'Issues in failure recovery',
              'Checkpoint based recovery',
              'Log based roll back recovery'
            ]
          },
          {
            name: 'Consensus and Distributed file system',
            topics: [
              'Consensus and agreement algorithms – Assumptions',
              'The Byzantine agreement and other problems',
              'Agreement in (message-passing) synchronous systems with failures',
              'Consensus algorithm for crash failures',
              'Distributed file system – File service architecture',
              'Case studies: Sun Network File System',
              'Andrew File System',
              'Google File System'
            ]
          }
        ]
      }
    );
  }

  res.render('courses', { 
    semester,
    branch,
    courses,
    page: 'courses'
  });
});

router.get('/course/:courseId/modules', courseController.getModules);
router.get('/module/:moduleId/study', courseController.getStudySession);

module.exports = router;