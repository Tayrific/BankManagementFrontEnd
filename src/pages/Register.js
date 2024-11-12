import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';
import { registerUser } from '../services/api';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');  // State variable for phone number
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear any previous success message

    try {
      const userData = { firstName, lastName, email, phoneNumber, password };
      const response = await registerUser(userData);
      setSuccessMessage("Registration successful! Please log in.");
      console.log("Registration successful:", response.data);
      // Clear form fields after successful registration
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');  
      setPassword('');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data); // Display backend error message
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      
      {/* Show success or error message if present */}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
            label="Phone Number"
            type="tel"  // Changed to 'tel' for phone number input
            margin="normal"
            value={phoneNumber}  // Assuming you have a state variable named phoneNumber
            onChange={(e) => setPhoneNumber(e.target.value)}  // Update state to capture phone number
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
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Register;