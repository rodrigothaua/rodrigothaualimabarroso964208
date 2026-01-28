import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { petService } from '../services/petService';
import type { Pet, PetWithTutor, PaginatedResponse } from '../types';

interface PetState {
  pets: Pet[];
  currentPet: PetWithTutor | null;
  pagination: {
    page: number;
    size: number;
    total: number;
    pageCount: number;
  };
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: PetState = {
  pets: [],
  currentPet: null,
  pagination: {
    page: 0,
    size: 10,
    total: 0,
    pageCount: 0,
  },
  loading: false,
  error: null,
  searchQuery: '',
};

export const fetchPets = createAsyncThunk(
  'pets/fetchAll',
  async ({ page = 0, size = 10, nome }: { page?: number; size?: number; nome?: string }, { rejectWithValue }) => {
    try {
      const response = await petService.getAll(page, size, nome);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao buscar pets');
    }
  }
);

export const fetchPetById = createAsyncThunk(
  'pets/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await petService.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao buscar pet');
    }
  }
);

export const createPet = createAsyncThunk(
  'pets/create',
  async (pet: Partial<Pet>, { rejectWithValue }) => {
    try {
      const response = await petService.create(pet);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao criar pet');
    }
  }
);

export const updatePet = createAsyncThunk(
  'pets/update',
  async ({ id, pet }: { id: number; pet: Partial<Pet> }, { rejectWithValue }) => {
    try {
      const response = await petService.update(id, pet);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao atualizar pet');
    }
  }
);

export const deletePet = createAsyncThunk(
  'pets/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const message = await petService.delete(id);
      return { id, message };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao excluir pet');
    }
  }
);

export const uploadPetPhoto = createAsyncThunk(
  'pets/uploadPhoto',
  async ({ id, file }: { id: number; file: File }, { rejectWithValue }) => {
    try {
      const response = await petService.uploadPhoto(id, file);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao fazer upload da foto');
    }
  }
);

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentPet: (state) => {
      state.currentPet = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all pets
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action: PayloadAction<PaginatedResponse<Pet>>) => {
        state.loading = false;
        state.pets = action.payload.content;
        state.pagination = {
          page: action.payload.page,
          size: action.payload.size,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch pet by id
      .addCase(fetchPetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetById.fulfilled, (state, action: PayloadAction<PetWithTutor>) => {
        state.loading = false;
        state.currentPet = action.payload;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create pet
      .addCase(createPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(createPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update pet
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.loading = false;
        const index = state.pets.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete pet
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action: PayloadAction<{ id: number; message: string }>) => {
        state.loading = false;
        state.pets = state.pets.filter(p => p.id !== action.payload.id);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Upload photo
      .addCase(uploadPetPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPetPhoto.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadPetPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearCurrentPet, clearError } = petSlice.actions;
export default petSlice.reducer;
