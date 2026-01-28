import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { tutorService } from '../services/tutorService';
import type { Tutor, TutorWithPets, PaginatedResponse } from '../types';

interface TutorState {
  tutores: Tutor[];
  currentTutor: TutorWithPets | null;
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

const initialState: TutorState = {
  tutores: [],
  currentTutor: null,
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

export const fetchTutores = createAsyncThunk(
  'tutores/fetchAll',
  async ({ page = 0, size = 10, nome }: { page?: number; size?: number; nome?: string }, { rejectWithValue }) => {
    try {
      const response = await tutorService.getAll(page, size, nome);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao buscar tutores');
    }
  }
);

export const fetchTutorById = createAsyncThunk(
  'tutores/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await tutorService.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao buscar tutor');
    }
  }
);

export const createTutor = createAsyncThunk(
  'tutores/create',
  async (tutor: Partial<Tutor>, { rejectWithValue }) => {
    try {
      const response = await tutorService.create(tutor);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao criar tutor');
    }
  }
);

export const updateTutor = createAsyncThunk(
  'tutores/update',
  async ({ id, tutor }: { id: number; tutor: Partial<Tutor> }, { rejectWithValue }) => {
    try {
      const response = await tutorService.update(id, tutor);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao atualizar tutor');
    }
  }
);

export const deleteTutor = createAsyncThunk(
  'tutores/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const message = await tutorService.delete(id);
      return { id, message };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao excluir tutor');
    }
  }
);

export const uploadTutorPhoto = createAsyncThunk(
  'tutores/uploadPhoto',
  async ({ id, file }: { id: number; file: File }, { rejectWithValue }) => {
    try {
      const response = await tutorService.uploadPhoto(id, file);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao fazer upload da foto');
    }
  }
);

export const linkPetToTutor = createAsyncThunk(
  'tutores/linkPet',
  async ({ tutorId, petId }: { tutorId: number; petId: number }, { rejectWithValue }) => {
    try {
      const message = await tutorService.linkPet(tutorId, petId);
      return { tutorId, petId, message };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao vincular pet');
    }
  }
);

export const unlinkPetFromTutor = createAsyncThunk(
  'tutores/unlinkPet',
  async ({ tutorId, petId }: { tutorId: number; petId: number }, { rejectWithValue }) => {
    try {
      const message = await tutorService.unlinkPet(tutorId, petId);
      return { tutorId, petId, message };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao desvincular pet');
    }
  }
);

const tutorSlice = createSlice({
  name: 'tutores',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentTutor: (state) => {
      state.currentTutor = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tutores
      .addCase(fetchTutores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutores.fulfilled, (state, action: PayloadAction<PaginatedResponse<Tutor>>) => {
        state.loading = false;
        state.tutores = action.payload.content;
        state.pagination = {
          page: action.payload.page,
          size: action.payload.size,
          total: action.payload.total,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(fetchTutores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch tutor by id
      .addCase(fetchTutorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorById.fulfilled, (state, action: PayloadAction<TutorWithPets>) => {
        state.loading = false;
        state.currentTutor = action.payload;
      })
      .addCase(fetchTutorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create tutor
      .addCase(createTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTutor.fulfilled, (state, action: PayloadAction<Tutor>) => {
        state.loading = false;
        state.tutores.push(action.payload);
      })
      .addCase(createTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update tutor
      .addCase(updateTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTutor.fulfilled, (state, action: PayloadAction<Tutor>) => {
        state.loading = false;
        const index = state.tutores.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tutores[index] = action.payload;
        }
      })
      .addCase(updateTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete tutor
      .addCase(deleteTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTutor.fulfilled, (state, action: PayloadAction<{ id: number; message: string }>) => {
        state.loading = false;
        state.tutores = state.tutores.filter(t => t.id !== action.payload.id);
      })
      .addCase(deleteTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Upload photo
      .addCase(uploadTutorPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadTutorPhoto.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadTutorPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Link pet
      .addCase(linkPetToTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(linkPetToTutor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(linkPetToTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Unlink pet
      .addCase(unlinkPetFromTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlinkPetFromTutor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unlinkPetFromTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearCurrentTutor, clearError } = tutorSlice.actions;
export default tutorSlice.reducer;
