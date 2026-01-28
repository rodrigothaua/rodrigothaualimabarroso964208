import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('should render pagination buttons', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={vi.fn()}
      />
    );
    
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próximo')).toBeInTheDocument();
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={vi.fn()}
      />
    );
    
    expect(screen.getByText('Anterior')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={5}
        onPageChange={vi.fn()}
      />
    );
    
    expect(screen.getByText('Próximo')).toBeDisabled();
  });

  it('should call onPageChange with correct page when previous is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );
    
    fireEvent.click(screen.getByText('Anterior'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange with correct page when next is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );
    
    fireEvent.click(screen.getByText('Próximo'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should display page buttons', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={vi.fn()}
      />
    );
    
    // Verifica os botões de página (1-5)
    expect(screen.getByText('3')).toHaveClass('bg-blue-600');
  });
});
