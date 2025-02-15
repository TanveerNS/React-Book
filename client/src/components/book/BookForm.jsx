// src/components/BookForm.js

import React, { useState, useEffect } from 'react';
import { createBook, updateBook, getBookById } from '../../services/api';

const BookForm = ({ bookId, setBookId, refreshBooks }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
  });

  useEffect(() => {
    if (bookId) {
      // If updating, fetch the book data
      const fetchBook = async () => {
        const book = await getBookById(bookId);
        setFormData({
          title: book.title,
          author: book.author,
          year: book.year,
          genre: book.genre,
        });
      };
      fetchBook();
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bookId) {
      await updateBook(bookId, formData);
    } else {
      await createBook(formData);
    }
    setBookId(null); // Clear form after submit
    refreshBooks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{bookId ? 'Update Book' : 'Create New Book'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />
      <button type="submit">{bookId ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default BookForm;
