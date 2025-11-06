import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
    
    if (error.response?.status === 403) {
      console.error('Forbidden - insufficient permissions');
    }
    
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }
    
    if (error.response?.status >= 500) {
      console.error('Server error - please try again later');
    }
    
    return Promise.reject(error);
  }
);

export default api;
