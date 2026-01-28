import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('should render loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should have animate-spin class', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('animate-spin');
  });
});
