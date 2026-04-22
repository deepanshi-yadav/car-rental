const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },
  vehicleName: String,
  vehicleImage: String,
  pricePerDay: Number,
  days: Number,
  pickupDate: String,
  pickupTime: String,
  returnDate: String,
  returnTime: String,
  location: String,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'paid', 'cancelled'], default: 'pending' },
  paymentId: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);

