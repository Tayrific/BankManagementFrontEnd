import axios from 'axios';


// The base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Register user function
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;  
  }
};

// Login user function
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    if (response.data && response.data.token) {
      // Save the token to localStorage on successful login
      localStorage.setItem('authToken', response.data.token);
      console.log('Login successful');
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Fetch user accounts function
export const fetchUserAccounts = async () => {
  try {
    const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
    if (token) {

      const response = await api.get('/accounts');
      return response.data;
    } else {
      throw new Error('No token found');
    }
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    throw error;
  }
};

// Add interceptor to include JWT token in Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Set header
  }
  return config;
});

export default api;