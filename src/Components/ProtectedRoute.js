import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');  // Check if token exists
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;  // If token exists, render the child components
};

export default ProtectedRoute;