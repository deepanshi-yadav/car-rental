const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  stock: { type: Number, default: 1 }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
