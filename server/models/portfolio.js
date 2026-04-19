const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  exchange: {
    type: String,
    enum: ['NSE', 'BSE'],
    required: true,
    default: 'NSE',
  },
  quantity: {
    type: Number,
    required: true,
    min: [0.0001, 'Quantity must be positive'],
  },
  buyPrice: {
    type: Number,
    required: true,
    min: [0, 'Buy price must be positive'],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    holdings: [holdingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);