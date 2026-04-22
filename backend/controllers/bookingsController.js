const Booking = require("../models/booking");
const Vehicle = require("../models/vehicle");
const { sendNotification } = require("../utils/notifications");

exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, vehicleName, vehicleImage, pricePerDay, days, pickupDate, pickupTime, returnDate, returnTime, location, totalPrice } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.available) {
      return res.status(400).json({ message: "Vehicle not available" });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      vehicleId,
      vehicleName,
      vehicleImage,
      pricePerDay,
      days,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      location,
      totalPrice
    });

    vehicle.available = false;
    await vehicle.save();

    sendNotification('booking', `Booking confirmed for ${vehicleName}. Total: ₹${totalPrice}`, req.user.email || 'user@example.com');

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const bookings = await Booking.find({ userId: req.user.id }).populate('vehicleId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings"
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const booking = await Booking.findById(req.user.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Booking.findByIdAndDelete(req.params.id);
    // Restore vehicle availability on cancel
    const cancelledBooking = await Booking.findById(req.params.id).populate('vehicleId');
    if (cancelledBooking) {
      const vehicle = await Vehicle.findById(cancelledBooking.vehicleId);
      vehicle.available = true;
      await vehicle.save();
    }

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed" });
  }
};

