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

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('CRITICAL ERROR: MONGO_URI is not defined in environment variables.');
  console.log('Falling back to local development database...');
}

mongoose.connect(mongoURI || 'mongodb://127.0.0.1:27017/swapling')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit if cannot connect in production
  });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/swaps', swapRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is awake' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Keep-alive logic for Render cold starts
    const url = process.env.RENDER_EXTERNAL_URL;
    if (url) {
        console.log(`Keep-alive enabled. Pinging ${url} every 14 minutes.`);
        setInterval(() => {
            const https = require('https');
            https.get(`${url}/api/health`, (res) => {
                console.log(`Self-ping successful: ${res.statusCode}`);
            }).on('error', (err) => {
                console.error(`Self-ping failed: ${err.message}`);
            });
        }, 14 * 60 * 1000); // 14 minutes
    }
});
