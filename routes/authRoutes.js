const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Remove the duplicate route
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/logout', authController.logout);

router.get('/dashboard', authController.isAuthenticated, authController.getDashboard);

// Profile routes
router.get('/profile', authController.isAuthenticated, authController.getProfile);
router.get('/edit-profile', authController.isAuthenticated, authController.getEditProfile);
router.post('/update-profile', authController.isAuthenticated, authController.updateProfile);
router.post('/change-password', authController.isAuthenticated, authController.changePassword);

module.exports = router;