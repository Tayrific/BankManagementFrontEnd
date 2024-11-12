import axios from 'axios';

//the base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:8080/',
});



// Login and register user function
export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (loginData) => api.post('/login', loginData);

export default api;