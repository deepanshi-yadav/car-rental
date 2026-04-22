const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }],
  available: { type: Boolean, default: true },
  stock: { type: Number, default: 1 },
  plans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }]
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
