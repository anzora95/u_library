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

export default function AddUserForm(){
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roles = [
    { value: 'student', label: 'Estudiante' },
    { value: 'librarian', label: 'Bibliotecario' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/users', userData);
      setSuccess('Usuario agregado correctamente');
      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'student'
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar el usuario');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Agregar Nuevo Usuario
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Rol</InputLabel>
              <Select
                name="role"
                value={userData.role}
                label="Rol"
                onChange={handleChange}
              >
                {roles.map(role => (
                  <MenuItem key={role.value} value={role.value}>{role.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Agregar Usuario
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
