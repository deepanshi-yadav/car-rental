const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental';
    await mongoose.connect(dbUrl);
    console.log('MongoDB Connected to car-rental');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;



