import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/authSlice';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated || location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              Pet Manager MT
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/" 
                className={`hover:bg-blue-700 px-3 py-2 rounded-md ${
                  location.pathname === '/' ? 'bg-blue-700' : ''
                }`}
              >
                Pets
              </Link>
              <Link 
                to="/tutores" 
                className={`hover:bg-blue-700 px-3 py-2 rounded-md ${
                  location.pathname === '/tutores' ? 'bg-blue-700' : ''
                }`}
              >
                Tutores
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};
