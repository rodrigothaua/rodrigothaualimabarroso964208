import { describe, it, expect } from 'vitest';
import tutorReducer, { fetchTutores } from '../tutorSlice';

describe('tutorSlice', () => {
  const initialState = {
    tutores: [],
    currentTutor: null,
    pagination: {
      page: 0,
      size: 10,
      total: 0,
      pageCount: 0
    },
    searchQuery: '',
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(tutorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchTutores', () => {
    it('should set loading to true when pending', () => {
      const action = { type: fetchTutores.pending.type };
      const state = tutorReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set tutores and pagination when fulfilled', () => {
      const mockData = {
        content: [
          { id: 1, nome: 'João Silva', cpf: '123.456.789-00' },
          { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00' }
        ],
        page: 0,
        size: 10,
        total: 10,
        pageCount: 2
      };

      const action = {
        type: fetchTutores.fulfilled.type,
        payload: mockData
      };
      
      const state = tutorReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.tutores).toEqual(mockData.content);
      expect(state.pagination.page).toBe(0);
      expect(state.pagination.size).toBe(10);
      expect(state.pagination.total).toBe(10);
      expect(state.pagination.pageCount).toBe(2);
      expect(state.error).toBeNull();
    });

    it('should set error when rejected', () => {
      const action = {
        type: fetchTutores.rejected.type,
        payload: 'Network error'
      };
      
      const state = tutorReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });
  });
});
