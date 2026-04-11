const Booking = require("../models/booking");
const Vehicle = require("../models/vehicle");
const User = require("../models/user");

exports.createBooking = async (req, res) => {
  try {
    const { userId, vehicleId, startDate, endDate } = req.body;

    // Check user and vehicle
    const user = await User.findById(userId);
    const vehicle = await Vehicle.findById(vehicleId);
    if (!user || !vehicle) {
      return res.status(400).json({ error: "Invalid user or vehicle" });
    }

    // Check vehicle availability
    if (!vehicle.available || vehicle.stock === 0) {
      return res.status(400).json({ error: "Vehicle not available" });
    }

    // Check for existing bookings (prevent double booking)
    const existingBooking = await Booking.findOne({
      vehicle: vehicleId,
      status: { $ne: 'Cancelled' },
      $or: [
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
      ]
    });
    if (existingBooking) {
      return res.status(400).json({ error: "Vehicle already booked for selected dates" });
    }

    // Calculate days and price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = vehicle.price * days;

    const booking = new Booking({
      user: userId,
      vehicle: vehicleId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'Confirmed'
    });

    await booking.save();

    // Update vehicle availability
    await Vehicle.findByIdAndUpdate(vehicleId, { available: false, stock: 0 });

    res.status(201).json(booking);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId
    }).populate('user vehicle');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

