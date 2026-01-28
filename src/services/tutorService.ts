import apiClient from './api';
import type { Tutor, TutorWithPets, PaginatedResponse } from '../types';

export const tutorService = {
  getAll: async (page = 0, size = 10, nome?: string): Promise<PaginatedResponse<Tutor>> => {
    const params: any = { page, size };
    if (nome) params.nome = nome;
    const response = await apiClient.get<PaginatedResponse<Tutor>>('/v1/tutores', { params });
    return response.data;
  },

  getById: async (id: number): Promise<TutorWithPets> => {
    const response = await apiClient.get<TutorWithPets>(`/v1/tutores/${id}`);
    return response.data;
  },

  create: async (tutor: Partial<Tutor>): Promise<Tutor> => {
    const response = await apiClient.post<Tutor>('/v1/tutores', tutor);
    return response.data;
  },

  update: async (id: number, tutor: Partial<Tutor>): Promise<Tutor> => {
    const response = await apiClient.put<Tutor>(`/v1/tutores/${id}`, tutor);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await apiClient.delete(`/v1/tutores/${id}`);
    return response.data;
  },

  uploadPhoto: async (id: number, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('foto', file);
    const response = await apiClient.post(`/v1/tutores/${id}/fotos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deletePhoto: async (id: number, fotoId: number): Promise<void> => {
    await apiClient.delete(`/v1/tutores/${id}/fotos/${fotoId}`);
  },

  linkPet: async (tutorId: number, petId: number): Promise<string> => {
    const response = await apiClient.post(`/v1/tutores/${tutorId}/pets/${petId}`);
    return response.data;
  },

  unlinkPet: async (tutorId: number, petId: number): Promise<string> => {
    const response = await apiClient.delete(`/v1/tutores/${tutorId}/pets/${petId}`);
    return response.data;
  },
};
