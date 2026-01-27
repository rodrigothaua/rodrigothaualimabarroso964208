import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const hasToken = !!localStorage.getItem('token');
  
  const authenticated = isAuthenticated || hasToken;

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
