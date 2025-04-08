import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import axios from 'axios';

export default function StudentsLoans () {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyLoans = async () => {
      try {
        const response = await axios.get('/api/loans/my');
        setLoans(response.data);
      } catch (err) {
        console.error('Error fetching loans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLoans();
  }, []);

  const getStatusChip = (loan) => {
    const today = new Date();
    const dueDate = new Date(loan.dueDate);
    const isOverdue = today > dueDate && !loan.returned;

    if (loan.returned) {
      return <Chip icon={<EventAvailableIcon />} label="Devuelto" color="success" />;
    } else if (isOverdue) {
      return <Chip icon={<EventBusyIcon />} label="Atrasado" color="error" />;
    } else {
      return <Chip icon={<EventAvailableIcon />} label="En préstamo" color="primary" />;
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

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Mis Préstamos
        </Typography>

        {loans.length === 0 ? (
          <Typography variant="body1">
            No tienes libros prestados actualmente.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Libro</TableCell>
                  <TableCell>Fecha Préstamo</TableCell>
                  <TableCell>Fecha Devolución</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map(loan => (
                  <TableRow key={loan._id}>
                    <TableCell>{loan.book.title}</TableCell>
                    <TableCell>{new Date(loan.loanDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(loan.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusChip(loan)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

