import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const defaultTheme = createTheme();

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Wrong credentials, please try again');
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AutoStoriesIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to library
          </Typography>
          <Typography    variant="h6">
            Please login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required = 'true'
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!email.trim() && error !== ''}
            />
            <TextField
              margin="normal"
              required = 'true'
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!password.trim() && error !== ''}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Login...' : 'Login'}
            </Button>
            <Grid container spacing={2}>
              <Grid item xs >
                <Link href="#" variant="body2">
                  Forgot your password?
                </Link>
              </Grid>
              <Grid item >
                <Link href="#" variant="body2">
                  {"Sign up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;