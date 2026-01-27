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
  
  console.log('=== PRIVATE ROUTE CHECK ===');
  console.log('Redux isAuthenticated:', isAuthenticated);
  console.log('localStorage hasToken:', hasToken);
  console.log('RESULTADO authenticated:', authenticated);
  
  if (!authenticated) {
    console.log('❌ NÃO autenticado - Redirecionando para /login');
  } else {
    console.log('✅ Autenticado - Permitindo acesso');
  }

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
