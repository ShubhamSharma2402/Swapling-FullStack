const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ecoScore: { type: Number, required: true, min: 1, max: 10 },
  ecoLabel: { type: String },
  material: { type: String, required: true },
  prices: {
    amazon: { type: Number, required: true },
    flipkart: { type: Number, required: true }
  },
  imageUrl: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
