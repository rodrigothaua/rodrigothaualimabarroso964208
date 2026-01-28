import apiClient from './api';
import type { AuthResponse, LoginCredentials } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('🔐 Tentando login com:', credentials);
    try {
      const response = await apiClient.post<AuthResponse>('/autenticacao/login', credentials);
      console.log('✅ Login bem-sucedido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro no login:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
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
      console.error('Erro ao renovar token:', error.message);
      throw new Error('Falha ao renovar sessão.');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
};

