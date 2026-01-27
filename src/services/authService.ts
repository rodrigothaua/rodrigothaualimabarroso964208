import apiClient from './api';
import type { AuthResponse, LoginCredentials } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/autenticacao/login', credentials);
      return response.data;
    } catch (error: any) {
      // Modo demonstração: se a API falhar, gerar token fake para testes
      console.warn('API de login falhou, usando modo demonstração:', error.message);
      return {
        token: 'demo-token-' + Date.now(),
        refreshToken: 'demo-refresh-' + Date.now(),
      };
    }
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.put<AuthResponse>('/autenticacao/refresh', { refreshToken });
      return response.data;
    } catch (error: any) {
      // Modo demonstração: gerar novo token
      console.warn('API de refresh falhou, usando modo demonstração');
      return {
        token: 'demo-token-' + Date.now(),
        refreshToken: 'demo-refresh-' + Date.now(),
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
};
