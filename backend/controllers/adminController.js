const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const Booking = require('../models/booking');

// Dashboard stats
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVehicles = await Vehicle.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const availableVehicles = await Vehicle.countDocuments({ available: true });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5).populate('userId vehicleId');

    res.json({
      stats: { totalUsers, totalVehicles, totalBookings, availableVehicles, pendingBookings },
      recentBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage Users (CRUD)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage Vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('plans');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId vehicleId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate('userId vehicleId');
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      const vehicle = await Vehicle.findById(booking.vehicleId);
      vehicle.available = true;
      await vehicle.save();
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

