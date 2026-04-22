const Vehicle = require("../models/vehicle.js");
const Plan = require('../models/plan.js');

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ available: true });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVehicleAvailability = async (req, res) => {
  try {
    const { vehicleId, available } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { available }, { new: true });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

