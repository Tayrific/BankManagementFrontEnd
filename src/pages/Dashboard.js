import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Typography, Button, Modal, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import './Styles/Dashboard.css';

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // State for modal visibility
  const [accountType, setAccountType] = useState(''); 
  const [balance, setBalance] = useState(0); 
  const [error, setError] = useState(''); 

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const handleAccountSubmit = async () => {

    if (!accountType) {
      setError('Please choose an account type');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
      const response = await fetch('http://localhost:8080/accounts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          
          accountType: accountType,
          balance: balance, // Balance is set to 0 for now
          user: { userId: userId },
        }),
      });

      if (response.ok) {
        const newAccount = await response.json();
        setAccounts([...accounts, newAccount]); // Add new account to the list
        handleModalClose(); // Close the modal
        setAccountType(''); // Clear form
        setBalance(0); // Reset balance
      } else {
        setError('Failed to create account');
      }
    } catch (error) {
      setError('Error creating account');
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  useEffect(() => {
    const loadUserDetails = async () => {
      if (userId) {
        try {
          const token = localStorage.getItem('authToken');
          const userResponse = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setFirstName(userData.firstName);
          }

          const accountsResponse = await fetch(`http://localhost:8080/accounts/user/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (accountsResponse.ok) {
            const accountsData = await accountsResponse.json();
            setAccounts(accountsData);
          }
        } catch (error) {
          console.error("Error fetching user details or accounts:", error);
        }
      }
      setLoading(false);
    };

    loadUserDetails();
  }, [userId]);

  return (
    <div className="dashboard">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div>
           <div className="topBar">
            <h1>Accounts</h1>
            <Button
              variant="contained"
              onClick={handleModalOpen}
              sx={{
                backgroundColor: '#8b8097', // Purple background
                '&:hover': {
                  backgroundColor: '#331524', // Hover color (darker purple)
                },
                fontSize: '18px', // Increase font size
                padding: '12px 24px', // Increase padding to make it bigger
              }}
            >
              Add Account
            </Button>
          </div>

            {/* Add Account Modal */}
            <Modal open={open} onClose={handleModalClose}>
              <Box className="modal-box">
                <Typography variant="h6" component="h2">
                  Add New Account
                </Typography>
                {error && <Typography color="error">{error}</Typography>}

                {/* Account Type Selection */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    label="Account Type"
                  >
                    <MenuItem value="CHECKING">Checking</MenuItem>
                    <MenuItem value="SAVING">Saving</MenuItem>
                  </Select>
                </FormControl>

                {/* Balance (Initial set to 0) */}
                <TextField
                  label="Balance"
                  type="number"
                  value={balance}
                  disabled
                  fullWidth
                  margin="normal"
                />

                <Button variant="contained" color="primary" onClick={handleAccountSubmit}>
                  Create Account
                </Button>
                <Button variant="outlined" onClick={handleModalClose} style={{ marginLeft: '10px' }}>
                  Cancel
                </Button>
              </Box>
            </Modal>

            <ul className="account-list-container">
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <Link
                    to={`/account/${account.accountId}`} // Link to the account details page
                    key={account.accountId}
                    style={{ textDecoration: 'none' }} // Remove underline from the link
                  >
                    <li className="account-card">
                      <h4 className="account-type">{account.accountType}</h4>
                      <h4 className="account-number">Account number: {account.accountNumber}</h4>
                      <p className="balance">Balance: £{account.balance}</p>
                    </li>
                  </Link>
                ))
              ) : (
                <Typography>No accounts found</Typography>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
