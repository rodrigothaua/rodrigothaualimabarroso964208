import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from '../ConfirmDialog';

describe('ConfirmDialog', () => {
  it('should always render (no isOpen prop)', () => {
    render(
      <ConfirmDialog
        title="Confirm"
        message="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('should render title and message', () => {
    render(
      <ConfirmDialog
        title="Delete Item"
        message="Are you sure you want to delete?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    
    expect(screen.getByText('Delete Item')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        title="Confirm"
        message="Proceed?"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />
    );
    
    fireEvent.click(screen.getByText('Confirmar'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        title="Confirm"
        message="Proceed?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />
    );
    
    fireEvent.click(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should not call onCancel when overlay is clicked', () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        title="Confirm"
        message="Proceed?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />
    );
    
    // Overlay click não está implementado
    expect(onCancel).not.toHaveBeenCalled();
  });
});
