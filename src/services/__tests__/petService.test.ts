import { describe, it, expect, vi, beforeEach } from 'vitest';
import { petService } from '../petService';

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

describe('petService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return paginated pets', async () => {
      const mockResponse = {
        data: {
          content: [
            { id: 1, nome: 'Rex', raca: 'Labrador' },
            { id: 2, nome: 'Luna', raca: 'Poodle' }
          ],
          totalPages: 2,
          totalElements: 10
        }
      };
      
      (apiClient.get as any).mockResolvedValue(mockResponse);
      
      const result = await petService.getAll(0, 10);

      expect(apiClient.get).toHaveBeenCalledWith('/v1/pets', {
        params: { page: 0, size: 10 }
      });
      expect(result.content).toHaveLength(2);
    });

    it('should include search parameter when provided', async () => {
      const mockResponse = {
        data: {
          content: [],
          totalPages: 0,
          totalElements: 0
        }
      };
      
      (apiClient.get as any).mockResolvedValue(mockResponse);
      
      await petService.getAll(0, 10, 'Rex');

      expect(apiClient.get).toHaveBeenCalledWith('/v1/pets', {
        params: { page: 0, size: 10, nome: 'Rex' }
      });
    });
  });

  describe('getById', () => {
    it('should return pet by id', async () => {
      const mockPet = { id: 1, nome: 'Rex', raca: 'Labrador' };
      (apiClient.get as any).mockResolvedValue({ data: mockPet });
      
      const result = await petService.getById(1);

      expect(apiClient.get).toHaveBeenCalledWith('/v1/pets/1');
      expect(result).toEqual(mockPet);
    });
  });

  describe('create', () => {
    it('should create new pet', async () => {
      const newPet = { nome: 'Rex', raca: 'Labrador', idade: 3 };
      const mockResponse = { data: { id: 1, ...newPet } };
      
      (apiClient.post as any).mockResolvedValue(mockResponse);
      
      const result = await petService.create(newPet);

      expect(apiClient.post).toHaveBeenCalledWith('/v1/pets', newPet);
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('should update existing pet', async () => {
      const updatedPet = { id: 1, nome: 'Rex Updated', raca: 'Labrador' };
      (apiClient.put as any).mockResolvedValue({ data: updatedPet });
      
      const result = await petService.update(1, updatedPet);

      expect(apiClient.put).toHaveBeenCalledWith('/v1/pets/1', updatedPet);
      expect(result.nome).toBe('Rex Updated');
    });
  });

  describe('delete', () => {
    it('should delete pet and return message', async () => {
      const mockMessage = 'Pet excluído com sucesso';
      (apiClient.delete as any).mockResolvedValue({ data: mockMessage });
      
      const result = await petService.delete(1);

      expect(apiClient.delete).toHaveBeenCalledWith('/v1/pets/1');
      expect(result).toBe(mockMessage);
    });
  });
});
