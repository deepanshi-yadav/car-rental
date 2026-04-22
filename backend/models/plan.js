const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: Number, required: true },
  multiplier: { type: Number, required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
