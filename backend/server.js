// server.js
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', bookRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
