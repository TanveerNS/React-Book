// config/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db('book-test');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Get the MongoDB database instance
const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};
module.exports = { connectDB, getDb };
