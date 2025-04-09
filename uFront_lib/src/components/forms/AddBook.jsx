import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';

export default function AddBookForm(){
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
    isbn: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://localhost:3001/api'; 

  const genres = [
    'Ficción',
    'No ficción',
    'Ciencia',
    'Tecnología',
    'Historia',
    'Biografía',
    'Arte',
    'Literatura'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(`${API_URL}/books`, bookData);
      setSuccess('Libro agregado correctamente');
      setBookData({
        title: '',
        author: '',
        publicationYear: '',
        genre: '',
        isbn: ''
      });
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Error al agregar el libro');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Agregar Nuevo Libro
      </Typography>
      
      {error && (
        <Typography color="error" paragraph>
          {error}
        </Typography>
      )}
      
      {success && (
        <Typography color="success" paragraph>
          {success}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Autor"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Año de Publicación"
              name="publicationYear"
              type="number"
              value={bookData.publicationYear}
              onChange={handleChange}
              inputProps={{
                min: 1800,
                max: new Date().getFullYear()
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Género</InputLabel>
              <Select
                name="genre"
                value={bookData.genre}
                label="Género"
                onChange={handleChange}
              >
                {genres.map(genre => (
                  <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={bookData.isbn}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Agregar Libro
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

