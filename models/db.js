const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const dbURI = process.env.DATABASE_URL;

if (!dbURI) {
  console.error('Error: DATABASE_URL is not defined in .env file');
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
