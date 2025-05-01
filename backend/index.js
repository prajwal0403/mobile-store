require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Sequelize instance and models
const { sequelize } = require('./models');

// Route handlers
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Basic health-check route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Mobile Store API' });
});

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
