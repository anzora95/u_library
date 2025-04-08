import React from 'react';
import { Container, Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import BookLoansList from '../../components/BookLoanList';
import AddUserForm from '../../components/forms/AddUser';
import AddBookForm from '../../components/forms/AddBook';

export default function LibrarianDashboard () {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel del Bibliotecario
        </Typography>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Préstamos Activos" />
            <Tab label="Agregar Libro" />
            <Tab label="Agregar Usuario" />
          </Tabs>
        </Paper>

        {tabValue === 0 && <BookLoansList />}
        {tabValue === 1 && <AddBookForm />}
        {tabValue === 2 && <AddUserForm />}
      </Box>
    </Container>
  );
};
