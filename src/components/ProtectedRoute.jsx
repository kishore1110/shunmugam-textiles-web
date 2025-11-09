import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireRole = null }) => {
  const userRole = localStorage.getItem('userRole');
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const isSupervisorLoggedIn = localStorage.getItem('isSupervisorLoggedIn') === 'true';
  
  // If no role specified, allow both admin and supervisor
  if (!requireRole) {
    if (!isAdminLoggedIn && !isSupervisorLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
  
  // If role is specified, check specific role
  if (requireRole === 'admin' && !isAdminLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireRole === 'supervisor' && !isSupervisorLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
