import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import './Styles/Dashboard.css';

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState('');  // State for user's first name
  const [accounts, setAccounts] = useState([]);  // State for accounts data
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  // Fetch user details (including first name) and accounts
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
            setAccounts(accountsData);  // Set fetched accounts to state
          } else {
            console.error("Failed to fetch accounts");
          }
        } catch (error) {
          console.error("Error fetching user details or accounts:", error);
        }
      }
      setLoading(false);
    };

    loadUserDetails();
  }, [userId]);  // Re-run the effect when userId changes

  return (
    <div className="dashboard">
      <div className="navbar">
        <Navbar />  
      </div>
      <div className="content">
        <h1>Hey {firstName}</h1>  
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div>
            <h2>Your Accounts</h2>
            <ul>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <li key={account.accountId}>
                    Account ID: {account.accountId}, Balance: {account.balance}
                  </li>
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

export default Dashboard