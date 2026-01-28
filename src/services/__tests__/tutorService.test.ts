import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tutorService } from '../tutorService';

// Mock do apiClient
vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import apiClient from '../api';

describe('tutorService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return paginated tutores', async () => {
      const mockResponse = {
        data: {
          content: [
            { id: 1, nome: 'João Silva', cpf: '123.456.789-00' },
            { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00' }
          ],
          totalPages: 2,
          totalElements: 10
        }
      };
      
      (apiClient.get as any).mockResolvedValue(mockResponse);
      
      const result = await tutorService.getAll(0, 10);

      expect(apiClient.get).toHaveBeenCalledWith('/v1/tutores', {
        params: { page: 0, size: 10 }
      });
      expect(result.content).toHaveLength(2);
    });
  });

  describe('getById', () => {
    it('should return tutor by id', async () => {
      const mockTutor = { id: 1, nome: 'João Silva', cpf: '123.456.789-00' };
      (apiClient.get as any).mockResolvedValue({ data: mockTutor });
      
      const result = await tutorService.getById(1);

      expect(apiClient.get).toHaveBeenCalledWith('/v1/tutores/1');
      expect(result).toEqual(mockTutor);
    });
  });

  describe('create', () => {
    it('should create new tutor', async () => {
      const newTutor = { nome: 'João Silva', cpf: '123.456.789-00', telefone: '65999999999' };
      const mockResponse = { data: { id: 1, ...newTutor } };
      
      (apiClient.post as any).mockResolvedValue(mockResponse);
      
      const result = await tutorService.create(newTutor);

      expect(apiClient.post).toHaveBeenCalledWith('/v1/tutores', newTutor);
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('should update existing tutor', async () => {
      const updatedTutor = { id: 1, nome: 'João Silva Updated', cpf: '123.456.789-00' };
      (apiClient.put as any).mockResolvedValue({ data: updatedTutor });
      
      const result = await tutorService.update(1, updatedTutor);

      expect(apiClient.put).toHaveBeenCalledWith('/v1/tutores/1', updatedTutor);
      expect(result.nome).toBe('João Silva Updated');
    });
  });

  describe('delete', () => {
    it('should delete tutor and return message', async () => {
      const mockMessage = 'Tutor excluído com sucesso';
      (apiClient.delete as any).mockResolvedValue({ data: mockMessage });
      
      const result = await tutorService.delete(1);

      expect(apiClient.delete).toHaveBeenCalledWith('/v1/tutores/1');
      expect(result).toBe(mockMessage);
    });
  });
});
