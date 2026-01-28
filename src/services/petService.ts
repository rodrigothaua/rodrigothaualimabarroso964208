import apiClient from './api';
import type { Pet, PetWithTutor, PaginatedResponse } from '../types';

export const petService = {
  getAll: async (page = 0, size = 10, nome?: string): Promise<PaginatedResponse<Pet>> => {
    const params: any = { page, size };
    if (nome) params.nome = nome;
    const response = await apiClient.get<PaginatedResponse<Pet>>('/v1/pets', { params });
    return response.data;
  },

  getById: async (id: number): Promise<PetWithTutor> => {
    const response = await apiClient.get<PetWithTutor>(`/v1/pets/${id}`);
    return response.data;
  },

  create: async (pet: Partial<Pet>): Promise<Pet> => {
    const response = await apiClient.post<Pet>('/v1/pets', pet);
    return response.data;
  },

  update: async (id: number, pet: Partial<Pet>): Promise<Pet> => {
    const response = await apiClient.put<Pet>(`/v1/pets/${id}`, pet);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await apiClient.delete(`/v1/pets/${id}`);
    return response.data;
  },

  uploadPhoto: async (id: number, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('foto', file);
    const response = await apiClient.post(`/v1/pets/${id}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deletePhoto: async (id: number, fotoId: number): Promise<void> => {
    await apiClient.delete(`/v1/pets/${id}/fotos/${fotoId}`);
  },
};
