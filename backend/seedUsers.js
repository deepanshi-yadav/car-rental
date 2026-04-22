const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
  try {
    await connectDB();
    const count = await User.countDocuments();

    if (count > 0) {
      process.exit(0);

    }

    const hashedAdminPass = bcrypt.hashSync('admin123', 12);
    const hashedUserPass = bcrypt.hashSync('user123', 12);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@rentifycar.com',
        password: hashedAdminPass,
        role: 'admin'
      },
      {
        name: 'Test User',
        email: 'user@rentifycar.com',
        phone: '+1234567890',
        password: hashedUserPass,
        role: 'user'
      }
    ];

    await User.insertMany(users);
    process.exit(0);

  } catch (err) {
    console.error('User seeding failed:', err);
    process.exit(1);
  }
};

seedUsers();

