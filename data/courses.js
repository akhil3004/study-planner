const courses = {
  'Computer Science and Engineering': {
    '1': [
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
              'Leadership styles, Leadership theories, Leadership and management, Leadership and power',
              'Leadership and influence, Leadership and motivation, Leadership and communication',
              'Leadership and decision making, Leadership and problem solving, Leadership and team building',
              'Leadership and change management, Leadership and innovation, Leadership and ethics'
            ]
          }
        ]
      }
    ],
    '2': [
      {
        name: 'Professional Communication',
        code: 'HUT 102',
        modules: [
          {
            name: 'Introduction to Professional Communication',
            topics: [
              'Importance of professional communication',
              'Types of communication',
              'Barriers to communication',
              'Effective communication skills',
              'Non-verbal communication'
            ]
          },
          {
            name: 'Written Communication',
            topics: [
              'Business letters',
              'Reports and proposals',
              'Technical documentation',
              'Email etiquette',
              'Resume writing'
            ]
          },
          {
            name: 'Oral Communication',
            topics: [
              'Public speaking',
              'Presentation skills',
              'Group discussions',
              'Interview techniques',
              'Negotiation skills'
            ]
          }
        ]
      },
      {
        name: 'Programming in C',
        code: 'CST 102',
        modules: [
          {
            name: 'Introduction to C',
            topics: [
              'History and features of C',
              'Structure of C program',
              'Data types and variables',
              'Operators and expressions',
              'Input and output functions'
            ]
          },
          {
            name: 'Control Structures',
            topics: [
              'Decision making statements',
              'Looping statements',
              'Break and continue',
              'Switch case',
              'Goto statement'
            ]
          },
          {
            name: 'Functions and Arrays',
            topics: [
              'Function definition and declaration',
              'Function types and parameters',
              'Recursion',
              'Arrays and strings',
              'Multi-dimensional arrays'
            ]
          },
          {
            name: 'Pointers and Structures',
            topics: [
              'Pointer basics',
              'Pointer arithmetic',
              'Pointers and arrays',
              'Structures and unions',
              'File handling'
            ]
          }
        ]
      }
    ],
    '3': [
      {
        name: 'Discrete Mathematical Structures',
        code: 'MAT 203',
        modules: [
          {
            name: 'Set Theory',
            topics: [
              'Sets and set operations',
              'Relations and functions',
              'Properties of relations',
              'Equivalence relations',
              'Partial ordering'
            ]
          },
          {
            name: 'Logic and Proofs',
            topics: [
              'Propositional logic',
              'Predicate logic',
              'Methods of proof',
              'Mathematical induction',
              'Recursive definitions'
            ]
          },
          {
            name: 'Graph Theory',
            topics: [
              'Basic concepts',
              'Types of graphs',
              'Graph algorithms',
              'Trees and spanning trees',
              'Graph coloring'
            ]
          }
        ]
      },
      {
        name: 'Data Structures',
        code: 'CST 203',
        modules: [
          {
            name: 'Arrays and Strings',
            topics: [
              '1D and 2D arrays',
              'String operations',
              'Array manipulation',
              'String matching',
              'Matrix operations'
            ]
          },
          {
            name: 'Linked Lists',
            topics: [
              'Singly linked lists',
              'Doubly linked lists',
              'Circular linked lists',
              'Linked list operations',
              'Applications'
            ]
          },
          {
            name: 'Stacks and Queues',
            topics: [
              'Stack implementation',
              'Queue implementation',
              'Applications',
              'Priority queues',
              'Deque'
            ]
          },
          {
            name: 'Trees',
            topics: [
              'Binary trees',
              'BST',
              'AVL trees',
              'B-trees',
              'Tree traversal'
            ]
          }
        ]
      }
    ],
    '4': [
      {
        name: 'Computer Organization and Architecture',
        code: 'CST 202',
        modules: [
          {
            name: 'Basic Structure of Computers',
            topics: [
              'Computer types and functional units',
              'Basic operational concepts',
              'Bus structures',
              'Memory locations and addresses',
              'Memory operations'
            ]
          },
          {
            name: 'Central Processing Unit',
            topics: [
              'General register organization',
              'Stack organization',
              'Instruction formats',
              'Addressing modes',
              'Data transfer and manipulation'
            ]
          },
          {
            name: 'Memory Organization',
            topics: [
              'Main memory',
              'Auxiliary memory',
              'Associative memory',
              'Cache memory',
              'Virtual memory'
            ]
          }
        ]
      }
    ],
    '5': [
      {
        name: 'Microprocessors and Microcontrollers',
        code: 'CST 307',
        modules: [
          {
            name: '8085 Microprocessor',
            topics: [
              'Architecture',
              'Instruction set',
              'Addressing modes',
              'Interrupts',
              'Assembly language programming'
            ]
          },
          {
            name: '8086 Microprocessor',
            topics: [
              'Architecture',
              'Memory segmentation',
              'Instruction set',
              'Interrupts',
              'Assembly language programming'
            ]
          },
          {
            name: '8051 Microcontroller',
            topics: [
              'Architecture',
              'Memory organization',
              'I/O ports',
              'Timers and counters',
              'Serial communication'
            ]
          }
        ]
      }
    ],
    '6': [
      {
        name: 'Industrial Economics & Foreign Trade',
        code: 'HUT 300',
        modules: [
          {
            name: 'Basic Economic Concepts',
            topics: [
              'Demand and supply',
              'Market equilibrium',
              'Price elasticity',
              'Production theory',
              'Cost analysis'
            ]
          },
          {
            name: 'Industrial Organization',
            topics: [
              'Market structures',
              'Monopoly and oligopoly',
              'Pricing strategies',
              'Market concentration',
              'Regulation'
            ]
          },
          {
            name: 'International Trade',
            topics: [
              'Trade theories',
              'Balance of payments',
              'Exchange rates',
              'Trade policies',
              'Globalization'
            ]
          }
        ]
      }
    ],
    '7': [
      {
        name: 'Artificial Intelligence',
        code: 'CST 401',
        modules: [
          {
            name: 'Introduction to AI',
            topics: [
              'History and foundations',
              'Intelligent agents',
              'Problem solving',
              'Search algorithms',
              'Knowledge representation'
            ]
          },
          {
            name: 'Machine Learning',
            topics: [
              'Types of learning',
              'Neural networks',
              'Decision trees',
              'Support vector machines',
              'Clustering'
            ]
          },
          {
            name: 'Natural Language Processing',
            topics: [
              'Text processing',
              'Parsing',
              'Semantic analysis',
              'Machine translation',
              'Chatbots'
            ]
          }
        ]
      }
    ],
    '8': [
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
    ]
  }
};

module.exports = courses; 