const Course = require('../models/Course');
const Module = require('../models/Module');

exports.getSemesters = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  // For KTU, typically 8 semesters
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  res.render('semester', { semesters, user: req.session.user });
};

exports.getBranches = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  const semester = req.params.semester;
  
  // Common branches in KTU
  const branches = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
  ];
  
  res.render('branch', { semester, branches, user: req.session.user });
};

exports.getCourses = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    
    const { semester, branch } = req.params;
    
    const courses = await Course.find({
      semester: parseInt(semester),
      branch: branch
    });
    
    res.render('courses', { semester, branch, courses, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getModules = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    
    const courseId = req.params.courseId;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    
    const modules = await Module.find({ courseId });
    
    res.render('modules', { course, modules, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getStudySession = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    
    const moduleId = req.params.moduleId;
    
    const module = await Module.findById(moduleId).populate('courseId');
    if (!module) {
      return res.status(404).send('Module not found');
    }
    
    res.render('study-session', { module, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};