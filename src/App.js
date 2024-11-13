import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/*  route for home */}
        <Route path="/" element={<Home />} />
        
        {/*  route for login */}
        <Route path="/login" element={<Login />} />
        
        {/*  route for register */}
        <Route path="/register" element={<Register />} />
        
        {/* Protected route for dashboard */}
        <Route
          path="/dashboard" element={ <Dashboard /> }/>
      </Routes>
    </Router>
  );
}

export default App;
