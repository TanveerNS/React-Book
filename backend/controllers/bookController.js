// controllers/bookController.js
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');  // Import ObjectId directly from mongodb


const createBook = async (req, res) => {
    try {
      const db = getDb();
      const collection = db.collection('books');
      const { title, author, year, genre } = req.body;
  
      // Validate that all required fields are present
      if (!title || !author || !year || !genre) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newBook = { title, author, year, genre };
      const result = await collection.insertOne(newBook);
  
      // Access the inserted ID and return the full book object
      const createdBook = { ...newBook, _id: result.insertedId };
      
      res.status(201).json({ message: 'Book created', book: createdBook });
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ message: 'Error creating book', error: error.message });
    }
  };
    

// src/controllers/bookController.js

const getBooks = async (req, res) => {
    try {
      const db = getDb();
      const collection = db.collection('books');
      const books = await collection.find().toArray();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
  };
  
  const getBook = async (req, res) => {
    try {
      const { id } = req.params;
      const db = getDb();
      const collection = db.collection('books');
      
      // Use new ObjectId to ensure proper conversion
      const book = await collection.findOne({ _id: new ObjectId(id) });
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ message: 'Error fetching book', error: error.message });
    }
  };
  
  // Update a book by its ID
  const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, year, genre } = req.body;
  
      if (!title || !author || !year || !genre) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const db = getDb();
      const collection = db.collection('books');
  
      const updatedBook = { title, author, year, genre };
  
      // Use new ObjectId to properly reference the book by its ID
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedBook }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json({ message: 'Book updated', book: { _id: id, ...updatedBook } });
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Error updating book', error: error.message });
    }
  };
  
  // Delete a book by its ID
  const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      const db = getDb();
      const collection = db.collection('books');
  
      // Use new ObjectId to properly reference the book by its ID
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
  };

module.exports = { createBook, getBooks, getBook, updateBook, deleteBook };
