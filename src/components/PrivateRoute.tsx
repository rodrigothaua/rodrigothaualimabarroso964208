import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const hasToken = !!localStorage.getItem('token');
  
  // Verifica tanto o Redux quanto o localStorage
  const authenticated = isAuthenticated || hasToken;
  
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - hasToken:', hasToken);
  console.log('PrivateRoute - authenticated:', authenticated);

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
