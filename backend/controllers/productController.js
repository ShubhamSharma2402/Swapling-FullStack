const Product = require('../models/Product');

// Mock data as requested for easy viva explanation without DB
const mockProducts = [
  { _id: '1', name: 'Bamboo Toothbrush', ecoScore: 9, material: 'Bamboo, Nylon', prices: { amazon: 120, flipkart: 110 }, imageUrl: '/images/bamboo_toothbrush_1776395484684.png', description: 'Sustainable bamboo toothbrush. Good alternative to plastic.' },
  { _id: '2', name: 'Plastic Bottle', ecoScore: 2, material: 'PET Plastic', prices: { amazon: 20, flipkart: 20 }, imageUrl: '/images/plastic_bottle_1776395543932.png', description: 'Harmful single-use plastic water bottle.' },
  { _id: '3', name: 'Steel Water Bottle', ecoScore: 8, material: 'Stainless Steel', prices: { amazon: 499, flipkart: 450 }, imageUrl: '/images/steel_bottle_1776395578187.png', description: 'Reusable steel water bottle. Best for environment.' },
  { _id: '4', name: 'Cotton Tote Bag', ecoScore: 7, material: 'Organic Cotton', prices: { amazon: 150, flipkart: 140 }, imageUrl: '/images/tote_bag_1776395593151.png', description: 'Reusable shopping bag made of organic cotton.' },
  { _id: '5', name: 'Aluminium Foil', ecoScore: 5, material: 'Aluminium', prices: { amazon: 80, flipkart: 75 }, imageUrl: '/images/aluminum_foil_1776395608363.png', description: 'Moderate eco impact.' },
  { _id: '6', name: 'Coconut Shell Bowl', ecoScore: 10, material: 'Coconut Shell', prices: { amazon: 299, flipkart: 250 }, imageUrl: '/images/coconut_bowl_1776395499817.png', description: 'Real coconut shell bowl for an organic, fully natural experience.' },
  { _id: '7', name: 'Eco Paper Cups', ecoScore: 6, material: 'Recycled Paper', prices: { amazon: 150, flipkart: 155 }, imageUrl: '/images/paper_cups_1776395514119.png', description: 'Biodegradable paper cups. Better than plastic but still disposable.' },
  { _id: '8', name: 'Paper Straws (Pack of 50)', ecoScore: 8, material: 'Paper', prices: { amazon: 110, flipkart: 99 }, imageUrl: '/images/paper_straws_1776395529473.png', description: 'Biodegradable paper straws. Essential swap for plastic straws!' }
];

exports.getProducts = async (req, res) => {
  try {
    const dbProducts = await Product.find();
    return res.json([...mockProducts, ...dbProducts]);
  } catch (error) {
    // Return mock data if mongo connection fails
    return res.json(mockProducts);
  }
};

// Simple NLP heuristic model to auto-generate eco scores based on text analysis
const analyzeEcoScore = (name, material, description) => {
  const text = `${name} ${material} ${description}`.toLowerCase();
  
  // Feature weights
  const positiveKeywords = ['recycled', 'organic', 'bamboo', 'sustainable', 'biodegradable', 'eco-friendly', 'reusable', 'natural', 'wood', 'steel', 'glass', 'cotton', 'compostable', 'paper'];
  const negativeKeywords = ['plastic', 'single-use', 'disposable', 'polyester', 'nylon', 'synthetic', 'toxic', 'harmful', 'chemical'];
  
  // Base neutral score
  let score = 5; 
  
  // Analyze text features applying ML-like naive bayes weighted adjustments
  positiveKeywords.forEach(word => {
    if (text.includes(word)) score += 1.5;
  });
  
  negativeKeywords.forEach(word => {
    if (text.includes(word)) score -= 2;
  });
  
  // Clamp score properly between 1 and 10
  score = Math.max(1, Math.min(10, Math.round(score)));
  
  // Classify label based on feature thresholds
  let label = 'Moderate';
  if (score >= 8) label = 'Eco-Friendly';
  else if (score < 5) label = 'Harmful';
  
  return { score, label };
};

exports.addProduct = async (req, res) => {
  try {
    const { name, material, prices, imageUrl, description } = req.body;
    
    // Auto-generate score and class label using NLP logic
    const analysis = analyzeEcoScore(name, material, description);
    
    const newProduct = new Product({
      name,
      material,
      prices,
      imageUrl: imageUrl || '/images/default_product.png',
      description,
      ecoScore: analysis.score,
      ecoLabel: analysis.label
    });
    
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error while adding product' });
  }
}; 
