import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  console.log('Token enviado na requisição:', token); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
    
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
    return Promise.reject(error);
  }
);

export default api;
