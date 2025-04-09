import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Asegúrate que coincide con tu backend
  timeout: 10000, // 10 segundos
});

// Interceptor para añadir el token a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o no válido
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default apiClient;