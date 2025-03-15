require('dotenv').config();  // Load environment variables from .env file into process.env object (for JWT_SECRET) 

const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./src/routes/cartRoutes');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(express.json());

// app.use('/api/carts', cartRoutes);
app.use('/api/cart', cartRoutes);

app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);

// Error handler (placed after all routes)
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/shoppyglobe')
    .then(() => {
        console.log('MongoDB connected');
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch(err => console.error(err));
