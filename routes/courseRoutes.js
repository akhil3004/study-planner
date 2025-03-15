const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

// Apply authentication middleware to all routes
router.use(authController.isAuthenticated);

router.get('/semesters', courseController.getSemesters);
router.get('/semester/:semester/branches', courseController.getBranches);
router.get('/semester/:semester/branch/:branch', courseController.getCourses);
router.get('/course/:courseId/modules', courseController.getModules);
router.get('/module/:moduleId/study', courseController.getStudySession);

module.exports = router;