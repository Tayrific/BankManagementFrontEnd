import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isRegister, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill out all fields');
      return;
    }

    // Prepare data for submission
    const formData = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    };

    // Call the onSubmit function passed as prop (loginUser or registerUser)
    onSubmit(formData)
      .then(() => {
        if (isRegister) {
          navigate('/login');  // Redirect to login after registration
        } else {
          navigate('/dashboard');  // Redirect to dashboard after login
        }
      })
      .catch((err) => {
        setError('Error occurred: ' + err.message);
      });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center">{isRegister ? 'Register' : 'Login'}</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
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
              label="Phone Number"
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </>
        )}

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
          {isRegister ? 'Register' : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;