import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const equipmentAPI = {
  getAll: () => api.get('/equipment'),
  getAvailable: () => api.get('/equipment/available'),
  create: (equipmentData) => api.post('/equipment', equipmentData),
  update: (id, equipmentData) => api.put(`/equipment/${id}`, equipmentData),
  delete: (id) => api.delete(`/equipment/${id}`),
};

export const requestAPI = {
  getAll: () => api.get('/requests'),
  getUserRequests: () => api.get('/requests/my-requests'),
  create: (requestData) => api.post('/requests', requestData),
  updateStatus: (id, status) => api.put(`/requests/${id}`, { status }),
};

export default api;
