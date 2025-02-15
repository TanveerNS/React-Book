// src/components/BookList.js

import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../../services/api';
import BookForm from './BookForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState(null); // Used for editing

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks(); // Refresh the list after deletion
  };

  const handleEdit = (id) => {
    setBookId(id); // Set the book ID for editing
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <BookForm bookId={bookId} setBookId={setBookId} refreshBooks={fetchBooks} />
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author} ({book.year}) - {book.genre}
            <button onClick={() => handleEdit(book._id)}>Edit</button>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
