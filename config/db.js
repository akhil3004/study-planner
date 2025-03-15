const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/swadhyaya')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = mongoose;