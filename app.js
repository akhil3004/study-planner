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
  res.render('index');
});

// Direct routes for authentication
app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);
app.get('/logout', authController.logout);

// Protected routes
app.get('/dashboard', authController.isAuthenticated, authController.getDashboard);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see your application`);
});