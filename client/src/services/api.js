// src/services/api.js

const API_URL = 'http://localhost:5000/api/books';

export const getBooks = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book:', error);
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating book:', error);
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting book:', error);
  }
};
