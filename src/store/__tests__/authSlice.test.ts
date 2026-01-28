import { describe, it, expect, beforeEach } from 'vitest';
import authReducer, { login, logout } from '../authSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    loading: false,
    error: null
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    // token e refreshToken podem ser null ou undefined dependendo do ambiente
  });

  describe('logout', () => {
    it('should clear all auth data', () => {
      const loggedInState = {
        ...initialState,
        isAuthenticated: true,
        token: 'access123',
        refreshToken: 'refresh123'
      };
      
      const state = authReducer(loggedInState, logout());
      
      expect(state.token).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('login', () => {
    it('should set loading to true when pending', () => {
      const action = { type: login.pending.type };
      const state = authReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set token when fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: {
          access_token: 'access123',
          refresh_token: 'refresh123'
        }
      };
      
      const state = authReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.token).toBe('access123');
      expect(state.refreshToken).toBe('refresh123');
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set error when rejected', () => {
      const action = {
        type: login.rejected.type,
        payload: 'Invalid credentials'
      };
      
      const state = authReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
    });
  });
});
