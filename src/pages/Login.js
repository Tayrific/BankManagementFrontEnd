import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For redirection after login
import { TextField, Button, Typography, Box } from '@mui/material';  // Material UI for styling

// Login Component
const Login = () => {
  const [email, setEmail] = useState('');  // State for email
  const [password, setPassword] = useState('');  // State for password
  const [error, setError] = useState('');  // State for error message
  const navigate = useNavigate();  // For redirecting after successful login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.text();  // Get the response as text (if it's just a token)
        if (data) {
          localStorage.setItem('authToken', data);  // Save token
          console.log('Login successful');        

          navigate('/dashboard');  // Redirect to dashboard
        } else {
          setError('No token received');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error occurred during login');
      console.error(error);
    }
  };
  
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;