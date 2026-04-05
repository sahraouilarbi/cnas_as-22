import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

export const dossiersApi = {
  getAll: (search) => api.get('/dossiers', { params: { search } }).then(res => res.data),
  getOne: (id) => api.get(`/dossiers/${id}`).then(res => res.data),
  create: (data) => api.post('/dossiers', data).then(res => res.data),
  update: (id, data) => api.put(`/dossiers/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/dossiers/${id}`).then(res => res.data),
};

export const configApi = {
  get: () => api.get('/config').then(res => res.data),
  update: (data) => api.post('/config', data).then(res => res.data),
};

export const assuresApi = {
  search: (q) => api.get('/assures', { params: { q } }).then(res => res.data),
};
