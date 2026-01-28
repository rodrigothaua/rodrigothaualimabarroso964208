import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toast } from '../Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should render even with empty message', () => {
    render(<Toast message="" type="success" onClose={vi.fn()} />);
    // Toast ainda renderiza, apenas sem texto
    const toast = document.querySelector('.fixed.bottom-4');
    expect(toast).toBeInTheDocument();
  });

  it('should render success toast with correct styles', () => {
    render(<Toast message="Success!" type="success" onClose={vi.fn()} />);
    const toast = screen.getByText('Success!').closest('div');
    expect(toast).toHaveClass('bg-green-500');
  });

  it('should render error toast with correct styles', () => {
    render(<Toast message="Error!" type="error" onClose={vi.fn()} />);
    const toast = screen.getByText('Error!').closest('div');
    expect(toast).toHaveClass('bg-red-500');
  });

  it('should render info toast with correct styles', () => {
    render(<Toast message="Info!" type="info" onClose={vi.fn()} />);
    const toast = screen.getByText('Info!').closest('div');
    expect(toast).toHaveClass('bg-blue-500');
  });

  it('should call onClose after 3 seconds', () => {
    const onClose = vi.fn();
    render(<Toast message="Auto close" type="success" onClose={onClose} />);
    
    expect(onClose).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(3000);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should have white text', () => {
    render(<Toast message="White text" type="success" onClose={vi.fn()} />);
    const message = screen.getByText('White text');
    expect(message).toHaveClass('text-white');
  });
});
