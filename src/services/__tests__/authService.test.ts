import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';

// Mock do apiClient
vi.mock('../api', () => ({
  default: {
    post: vi.fn(),
    put: vi.fn(),
  },
}));

import apiClient from '../api';

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should return access_token and refresh_token on successful login', async () => {
      const mockResponse = {
        data: {
          access_token: 'access123',
          refresh_token: 'refresh123'
        }
      };
      
      (apiClient.post as any).mockResolvedValue(mockResponse);
      
      const result = await authService.login({ username: 'admin', password: 'admin' });
      
      expect(apiClient.post).toHaveBeenCalledWith('/autenticacao/login', {
        username: 'admin',
        password: 'admin'
      });
      expect(result).toEqual({
        access_token: 'access123',
        refresh_token: 'refresh123'
      });
    });

    it('should throw error on failed login', async () => {
      (apiClient.post as any).mockRejectedValue(new Error('Invalid credentials'));
      
      await expect(authService.login({ username: 'wrong', password: 'wrong' })).rejects.toThrow();
    });
  });

  describe('refresh', () => {
    it('should return new access_token on successful refresh', async () => {
      const mockResponse = {
        data: {
          access_token: 'newAccess123',
          refresh_token: 'newRefresh123'
        }
      };
      
      (apiClient.put as any).mockResolvedValue(mockResponse);
      
      const result = await authService.refresh('refresh123');

      expect(apiClient.put).toHaveBeenCalledWith('/autenticacao/refresh', {}, {
        headers: { Authorization: 'Bearer refresh123' }
      });
      expect(result).toEqual({ access_token: 'newAccess123', refresh_token: 'newRefresh123' });
    });

    it('should throw error on failed refresh', async () => {
      (apiClient.put as any).mockRejectedValue(new Error('Invalid refresh token'));
      
      await expect(authService.refresh('invalid')).rejects.toThrow();
    });
  });
});
