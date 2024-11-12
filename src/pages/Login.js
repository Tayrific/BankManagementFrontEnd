import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';
import { loginUser } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const loginData = { email, password };
        const response = await loginUser(loginData);
        alert("Login successful!");
        console.log("Login successful:", response.data);
        // Redirect to dashboard or main page on successful login
      } catch (error) {
        // Check if the error has a response from the server
        if (error.response) {
          setErrorMessage(error.response.data); // Backend error message
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      
      {/* Show error message if present */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      
      <form onSubmit={handleLogin}>
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
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;