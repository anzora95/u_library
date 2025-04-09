import React from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function StudentsDashboard (){
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Biblioteca Universitaria
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Bienvenido al sistema de gestión de biblioteca
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <LibraryBooksIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Explorar Libros
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Busca y descubre todos los libros disponibles en la biblioteca
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/student/booklist')}
                fullWidth
              >
                Ver Catálogo
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <ListAltIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Mis Préstamos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Revisa los libros que tienes prestados y sus fechas de entrega
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/student/my-loans')}
                fullWidth
              >
                Ver Mis Préstamos
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

