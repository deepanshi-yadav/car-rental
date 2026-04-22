const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Plan = require('./models/plan');

const seedPlans = async () => {
  try {
    await connectDB();
    await Plan.deleteMany({}); // Clear existing plans


const Vehicle = require('./models/vehicle');
const vehicles = await Vehicle.find({});
    if (vehicles.length === 0) {
      process.exit(0);

    }

    const planTemplates = [
      { name: '1 Day', days: 1, multiplier: 1 },
      { name: '3 Days', days: 3, multiplier: 2.7 },
      { name: '7 Days', days: 7, multiplier: 6.2 },
      { name: '15 Days', days: 15, multiplier: 12.5 },
      { name: '1 Month', days: 30, multiplier: 24 }
    ];

    const plansToInsert = [];
    for (const vehicle of vehicles) {
      planTemplates.forEach(template => {
        plansToInsert.push({
          ...template,
          vehicle: vehicle._id
        });
      });
    }

    await Plan.insertMany(plansToInsert);
    process.exit(0);

  } catch (err) {
    console.error('Plans seeding failed:', err);
    process.exit(1);
  }
};

seedPlans();
