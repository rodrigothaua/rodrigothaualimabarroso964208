import React from 'react';
import { Button } from './Button';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="bg-red-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-lg">{message}</p>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
          <Button onClick={onCancel} variant="secondary">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="danger">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
