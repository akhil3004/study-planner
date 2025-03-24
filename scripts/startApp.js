// Script to start the application with proper database connection
require('dotenv').config();

console.log('Starting the application with data from MongoDB...');
console.log('This script ensures the MongoDB data is used instead of hardcoded data.');

// Set environment variables
process.env.USE_MONGODB = 'true';
process.env.PORT = process.env.PORT || '3000';

// Start the application
require('../app');

console.log('=============================================================');
console.log('The application is now using data from MongoDB collections.');
console.log('Courses, modules, and topics are loaded from the MongoDB database.');
console.log('To access the courses:');
console.log('1. Log in to the application');
console.log('2. Navigate to the Courses section');
console.log('3. Select a semester and branch ');
console.log('4. Browse the courses imported from MongoDB collections');
console.log('============================================================='); 