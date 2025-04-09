import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data.data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data.data.book;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};