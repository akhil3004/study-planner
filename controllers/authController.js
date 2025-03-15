const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    // Set session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      semester: user.currentSemester
    };

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'An error occurred during login' });
  }
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, registerNumber, branch, currentSemester } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { registerNumber }] });
    if (existingUser) {
      return res.render('register', { error: 'Email or Register Number already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      registerNumber,
      branch,
      currentSemester: parseInt(currentSemester)
    });

    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'An error occurred during registration' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
};

// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};