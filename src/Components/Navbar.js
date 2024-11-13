import React from 'react';
import { Avatar, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import './Styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/login');  // Redirect to the login page
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      {/* Profile Picture */}
      <div className="profile">
        <Avatar alt="User Profile" src="/path/to/profile.jpg" sx={{ width: 60, height: 60 }} />
      </div>

      {/* Navigation Links */}
      <List component="nav">
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <AccountBalanceIcon />
          <ListItemText primary="Accounts" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/dashboard/settings')}>
          <SettingsIcon />
          <ListItemText primary="Settings" />
        </ListItem>   
        <ListItem button onClick={handleLogout}>
          <LogoutIcon />
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );
};

export default Navbar;