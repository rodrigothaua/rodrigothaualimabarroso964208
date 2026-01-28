import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from '../useToast';

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should initialize with empty message', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current.toast.message).toBe('');
    expect(result.current.toast.type).toBe('success');
    expect(result.current.toast.show).toBe(false);
  });

  it('should show success toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Success message', 'success');
    });
    
    expect(result.current.toast.message).toBe('Success message');
    expect(result.current.toast.type).toBe('success');
    expect(result.current.toast.show).toBe(true);
  });

  it('should show error toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Error message', 'error');
    });
    
    expect(result.current.toast.message).toBe('Error message');
    expect(result.current.toast.type).toBe('error');
  });

  it('should show info toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Info message', 'info');
    });
    
    expect(result.current.toast.message).toBe('Info message');
    expect(result.current.toast.type).toBe('info');
  });

  it('should clear toast message', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Success', 'success');
    });
    
    expect(result.current.toast.show).toBe(true);
    
    act(() => {
      result.current.hideToast();
    });
    
    expect(result.current.toast.show).toBe(false);
  });
});
