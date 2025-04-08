import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

export default function BookLoansList(){
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveLoans = async () => {
      try {
        const response = await axios.get('/api/loans/active');
        setLoans(response.data);
      } catch (err) {
        setError('Error al cargar los préstamos');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveLoans();
  }, []);

  const handleReturnBook = async (loanId) => {
    try {
      await axios.patch(`/api/loans/${loanId}/return`);
      setLoans(loans.filter(loan => loan._id !== loanId));
    } catch (err) {
      setError('Error al marcar como devuelto');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" my={4}>
        {error}
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Libro</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Fecha Préstamo</TableCell>
            <TableCell>Fecha Devolución</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


          {/* {loans.map((loan) => (
            <TableRow key={loan._id}>
              <TableCell>{loan.book.title}</TableCell>
              <TableCell>{loan.user.firstName} {loan.user.lastName}</TableCell>
              <TableCell>{new Date(loan.loanDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(loan.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleReturnBook(loan._id)}
                >
                  Marcar como devuelto
                </Button>
              </TableCell>
            </TableRow>
          ))} */}

            <TableRow key="1">
              <TableCell>Libro prestado 1</TableCell>
              <TableCell>José - Anzora</TableCell>
              <TableCell>15-03-1995</TableCell>
              <TableCell>15-03-1996</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleReturnBook(1)}
                >
                  Marcar como devuelto
                </Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
