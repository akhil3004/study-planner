// Script to reset Mongoose models and verify schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Delete User model if it exists
if (mongoose.modelNames().includes('User')) {
  console.log('Deleting existing User model');
  delete mongoose.models.User;
}

// Recreate User schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  registerNumber: {
    type: String,
    required: true,
    unique: true
  },
  branch: {
    type: String,
    required: true
  },
  currentSemester: {
    type: Number,
    required: true
  },
  scheme: {
    type: String,
    required: true,
    enum: ['2015', '2019', '2024']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Verify schema
console.log('User Schema enum values for scheme:', userSchema.path('scheme').enumValues);

// Test validation
const testUser = new User({
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  registerNumber: 'TEST123',
  branch: 'Computer Science and Engineering',
  currentSemester: 1,
  scheme: '2019'
});

testUser.validate()
  .then(() => {
    console.log('Test user validation successful');
    console.log(testUser);
  })
  .catch(err => {
    console.error('Test user validation failed:', err.message);
  })
  .finally(() => {
    mongoose.disconnect()
      .then(() => console.log('Mongoose disconnected'))
      .catch(err => console.error('Error disconnecting Mongoose:', err));
  }); 