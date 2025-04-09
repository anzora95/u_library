import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../services/api';
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Paper
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookList(){
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    title: '',
    author: '',
    genre: ''
  });
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchBooksAndGenres = async () => {
  //     try {
  //       const [booksRes, genresRes] = await Promise.all([
  //         axios.get('/api/books'),
  //         axios.get('/api/books/genres')
  //       ]);
  //       setBooks(booksRes.data);
  //       setGenres(genresRes.data);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBooksAndGenres();
  // }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadBooks();
  }, []);



  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      book.author.toLowerCase().includes(filter.author.toLowerCase()) &&
      (filter.genre === '' || book.genre === filter.genre)
    );
  });

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Catálogo de Libros
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Filtrar por título"
                name="title"
                value={filter.title}
                onChange={handleFilterChange}
                InputProps={{
                  startAdornment: <SearchIcon color="action" />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Filtrar por autor"
                name="author"
                value={filter.author}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Género</InputLabel>
                <Select
                  name="genre"
                  value={filter.genre}
                  label="Género"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {genres.map(genre => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {filteredBooks.map(book => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label={book.genre} size="small" />
                    <Chip 
                      label={`Disponibles: ${book.availableCopies}`} 
                      size="small" 
                      color={book.availableCopies > 0 ? 'success' : 'error'}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => navigate(`/student/books/${book._id}`)}
                  >
                    Ver detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredBooks.length === 0 && (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            No se encontraron libros con los filtros aplicados
          </Typography>
        )}
      </Box>
    </Container>
  );
};

