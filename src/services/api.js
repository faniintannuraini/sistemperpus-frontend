import axios from 'axios';
import { getCookie, eraseCookie } from '../utils/cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor untuk otomatis menyematkan Token Auth di header
api.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor untuk otomatis redirect ke login saat token tidak valid atau kedaluwarsa (401)
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    eraseCookie('token');
    eraseCookie('role');
    
    // Jangan redirect jika user memang sudah berada di halaman login
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login?reason=expired';
    }
  }
  return Promise.reject(error);
});

export default api;
