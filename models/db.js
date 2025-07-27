const mongoose = require('mongoose');

const dbURI = process.env.DATABASE_URL;

if (!dbURI) {
  console.error('Error: DATABASE_URL is not defined. Check your .env file or Vercel environment variables.');
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
