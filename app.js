// Load environment variables
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session'); // Add this line

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001; // Changed to 3001 to avoid port conflicts

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Session middleware - Add this before other middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Import controllers
const authController = require('./controllers/authController');

// Use routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/quizzes', quizRoutes);

// Basic route for home page
app.get('/', (req, res) => {
  res.render('index', { page: 'home' });
});

// Direct routes for authentication
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);
app.get('/logout', authController.logout);

// Protected routes
app.get('/dashboard', authController.isAuthenticated, authController.getDashboard);

// Semester details route
app.get('/courses/semester/:semester/branch/:branch', (req, res) => {
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
      }
      // Add other courses...
    );
  }

  res.render('courses', { 
    semester,
    branch,
    courses,
    page: 'courses'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see your application`);
});