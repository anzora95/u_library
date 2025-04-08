import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookDetail () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError('Error al cargar los detalles del libro');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrowBook = async () => {
    try {
      await axios.post(`/api/loans`, { bookId: id });
      setSuccess('Libro solicitado correctamente');
      // Actualizar disponibilidad
      setBook(prev => ({
        ...prev,
        availableCopies: prev.availableCopies - 1
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Error al solicitar el libro');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ my: 4 }}>
          {error || 'Libro no encontrado'}
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/student/books')}>
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/student/books')}
          sx={{ mb: 2 }}
        >
          Volver al catálogo
        </Button>

        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {book.author}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={book.genre} />
                <Chip 
                  label={`Publicado: ${book.publicationYear}`} 
                  variant="outlined" 
                />
                <Chip 
                  label={`Disponibles: ${book.availableCopies}`}
                  color={book.availableCopies > 0 ? 'success' : 'error'}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" paragraph>
                {book.description || 'No hay descripción disponible para este libro.'}
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                ISBN: {book.isbn}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Solicitar este libro
                </Typography>
                
                {book.availableCopies > 0 ? (
                  <>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Hay {book.availableCopies} copias disponibles
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={handleBorrowBook}
                      disabled={!!success}
                      fullWidth
                    >
                      {success ? 'Solicitud enviada' : 'Solicitar libro'}
                    </Button>
                  </>
                ) : (
                  <Alert severity="warning">
                    No hay copias disponibles actualmente
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {success}
                  </Alert>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

