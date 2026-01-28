import apiClient from './api';
import type { AuthResponse, LoginCredentials } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/autenticacao/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Falha no login. Verifique suas credenciais.');
    }
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.put<AuthResponse>(
        '/autenticacao/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error('Falha ao renovar sessão.');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
};

