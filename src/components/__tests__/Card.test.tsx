import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable card</Card>);
    
    fireEvent.click(screen.getByText('Clickable card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have hover styles when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Hoverable</Card>);
    const card = screen.getByText('Hoverable');
    expect(card).toHaveClass('hover:shadow-lg');
  });

  it('should not have cursor-pointer when onClick is not provided', () => {
    render(<Card>Non-clickable</Card>);
    const card = screen.getByText('Non-clickable').parentElement;
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('should apply custom className', () => {
    render(<Card className="custom-card">Custom</Card>);
    const card = screen.getByText('Custom');
    expect(card).toHaveClass('custom-card');
  });
});
