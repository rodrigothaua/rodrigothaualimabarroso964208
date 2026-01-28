import { describe, it, expect } from 'vitest';
import authReducer, { logout } from '../store/authSlice';

describe('Auth Slice', () => {
  it('should handle initial state', () => {
    const initialState = {
      isAuthenticated: false,
      token: undefined,
      refreshToken: undefined,
      loading: false,
      error: null,
    };
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle logout', () => {
    const previousState = {
      isAuthenticated: true,
      token: 'test-token',
      refreshToken: 'test-refresh',
      loading: false,
      error: null,
    };
    expect(authReducer(previousState, logout())).toEqual({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      loading: false,
      error: null,
    });
  });
});
