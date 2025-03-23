const User = require('../models/User');

// Login page
exports.getLogin = (req, res) => {
  res.render('login');
};

// Register page
exports.getRegister = (req, res) => {
  res.render('register');
};

// Login submission
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

// Register submission
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

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
};

// Dashboard page
exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { 
    user: req.session.user,
    page: 'dashboard'
  });
};

// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Profile page
exports.getProfile = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  User.findById(req.session.user.id)
    .then(user => {
      if (!user) {
        return res.redirect('/dashboard');
      }
      res.render('profile', { 
        user,
        query: req.query
      });
    })
    .catch(err => {
      console.error('Error fetching profile:', err);
      res.redirect('/dashboard');
    });
};

// Edit profile page
exports.getEditProfile = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  User.findById(req.session.user.id)
    .then(user => {
      if (!user) {
        return res.redirect('/dashboard');
      }
      res.render('edit-profile', { user });
    })
    .catch(err => {
      console.error('Error fetching user for edit:', err);
      res.redirect('/dashboard');
    });
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    
    const { name, email, branch, currentSemester, scheme } = req.body;
    
    // Check if email is already in use by another user
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: req.session.user.id } 
    });
    
    if (existingUser) {
      const user = await User.findById(req.session.user.id);
      return res.render('edit-profile', { 
        user,
        error: 'Email is already in use by another account',
        page: 'profile'
      });
    }
    
    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      req.session.user.id,
      { 
        name, 
        email, 
        branch, 
        currentSemester: parseInt(currentSemester),
        scheme
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.redirect('/dashboard');
    }
    
    // Update session data
    req.session.user = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      branch: updatedUser.branch,
      semester: updatedUser.currentSemester,
      scheme: updatedUser.scheme
    };
    
    res.redirect('/auth/profile?success=true');
  } catch (error) {
    console.error('Error updating profile:', error);
    const user = await User.findById(req.session.user.id);
    res.render('edit-profile', { 
      user,
      error: 'An error occurred while updating your profile',
      page: 'profile'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // Get user
    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res.redirect('/login');
    }
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.render('edit-profile', { 
        user,
        error: 'Current password is incorrect',
        page: 'profile'
      });
    }
    
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return res.render('edit-profile', { 
        user,
        error: 'New passwords do not match',
        page: 'profile'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.redirect('/auth/profile?passwordChanged=true');
  } catch (error) {
    console.error('Error changing password:', error);
    const user = await User.findById(req.session.user.id);
    res.render('profile', { 
      user,
      error: 'An error occurred while changing your password',
      page: 'profile'
    });
  }
};