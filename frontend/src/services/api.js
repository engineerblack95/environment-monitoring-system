import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const getLatestReading = () => api.get('/readings/latest');
export const getHistory = (limit = 50) => api.get(`/readings?limit=${limit}`);
export const getDeviceStatus = () => api.get('/device/status');

export default api;