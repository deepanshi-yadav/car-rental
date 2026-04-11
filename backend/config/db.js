const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUrl = process.env.DB_URL || 'mongodb+srv://deepanshiy68_db_user:KrpYRPsX73JJvnjh@car-rentals.nte3hfc.mongodb.net/car-rentals';
    await mongoose.connect(dbUrl);
    console.log('MongoDB Connected to car-rentals');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;



