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
          }
          // Add other modules...
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

router.get('/course/:courseId/modules', courseController.getModules);
router.get('/module/:moduleId/study', courseController.getStudySession);

module.exports = router;