require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const swapRoutes = require('./routes/swaps');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB connection (with fallback if not running)
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swapling';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error (Falling back to Mock data):', err.message));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/swaps', swapRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
