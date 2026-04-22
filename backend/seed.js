const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Vehicle = require('./models/vehicle');

const seedVehicles = async () => {
  try {
    await connectDB();
    const count = await Vehicle.countDocuments();

    if (count > 0) {
      await Vehicle.updateMany({}, { available: true, stock: 10 });
      console.log(`Updated ${await Vehicle.countDocuments()} vehicles - all available: true, stock: 10.`);
      process.exit(0);
    }

    const vehicles = [
      {
        name: "Swift Dzire",
        type: "Sedan",
        price: 4200,
        available: true,
        stock: 10
      },
      {
        name: "Toyota Fortuner",
        type: "SUV",
        price: 9000,
        available: true,
        stock: 10
      },
      {
        name: "BMW X5",
        type: "Luxury SUV",
        price: 10000,
        available: true,
        stock: 10
      },
      {
        name: "Mahindra Thar",
        type: "Off-Road SUV",
        price: 8000,
        available: true,
        stock: 10
      },
      {
        name: "Lamborghini Huracan",
        type: "Luxury Sports",
        price: 15000,
        description: "High-performance luxury sports car",
        available: true,
        stock: 10
      },
      // Added 2 more to make 7 as requested
      {
        name: "Mercedes S-Class",
        type: "Luxury Sedan",
        price: 12000,
        available: true,
        stock: 10
      },
      {
        name: "Audi Q7",
        type: "Luxury SUV",
        price: 11000,
        available: true,
        stock: 10
      }
    ];

    await Vehicle.insertMany(vehicles);
    console.log('7 original cars seeded.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedVehicles();
