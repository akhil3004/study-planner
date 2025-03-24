// Script to view a sample document from MongoDB collections
require('dotenv').config();
const mongoose = require('mongoose');

async function viewCollectionSample() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected');
    
    // Get database and collections
    const db = mongoose.connection.db;
    
    // Check if collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('Available collections:', collectionNames);
    
    // Check course collection
    if (collectionNames.includes('course')) {
      const sample = await db.collection('course').findOne({});
      console.log('\nSample document from course collection:');
      console.log(JSON.stringify(sample, null, 2));
    }
    
    // Check course2 collection
    if (collectionNames.includes('course2')) {
      const sample = await db.collection('course2').findOne({});
      console.log('\nSample document from course2 collection:');
      console.log(JSON.stringify(sample, null, 2));
    }
    
  } catch (error) {
    console.error('Error viewing collections:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  }
}

// Run the script
viewCollectionSample(); 