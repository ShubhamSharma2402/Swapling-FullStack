const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  materials: { type: String },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number },
  user: { type: String, default: 'Anonymous User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Swap', swapSchema);
