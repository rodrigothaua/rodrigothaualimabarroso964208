import { describe, it, expect } from 'vitest';
import petReducer, { fetchPets, setSearchQuery } from '../petSlice';

describe('petSlice', () => {
  const initialState = {
    pets: [],
    currentPet: null,
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
    expect(petReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setSearchQuery', () => {
    it('should update search query', () => {
      const state = petReducer(initialState, setSearchQuery('Rex'));
      expect(state.searchQuery).toBe('Rex');
    });
  });

  describe('fetchPets', () => {
    it('should set loading to true when pending', () => {
      const action = { type: fetchPets.pending.type };
      const state = petReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set pets and pagination when fulfilled', () => {
      const mockData = {
        content: [
          { id: 1, nome: 'Rex', raca: 'Labrador' },
          { id: 2, nome: 'Luna', raca: 'Poodle' }
        ],
        page: 0,
        size: 10,
        total: 10,
        pageCount: 2
      };

      const action = {
        type: fetchPets.fulfilled.type,
        payload: mockData
      };
      
      const state = petReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.pets).toEqual(mockData.content);
      expect(state.pagination.page).toBe(0);
      expect(state.pagination.size).toBe(10);
      expect(state.pagination.total).toBe(10);
      expect(state.pagination.pageCount).toBe(2);
      expect(state.error).toBeNull();
    });

    it('should set error when rejected', () => {
      const action = {
        type: fetchPets.rejected.type,
        payload: 'Network error'
      };
      
      const state = petReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Network error');
    });
  });
});
