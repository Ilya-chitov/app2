import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: string;
  motherId?: string;
  fatherId?: string;
  notes?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  tempId?: string; // For offline operations
}

interface AnimalsState {
  animals: Animal[];
  loading: boolean;
  error: string | null;
  offlineQueue: Animal[]; // Animals added while offline
}

const initialState: AnimalsState = {
  animals: [],
  loading: false,
  error: null,
  offlineQueue: [],
};

// Async thunks
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals',
  async () => {
    const response = await fetch('/api/animals');
    if (!response.ok) {
      throw new Error('Failed to fetch animals');
    }
    return response.json();
  }
);

export const createAnimal = createAsyncThunk(
  'animals/createAnimal',
  async (animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animalData),
    });
    if (!response.ok) {
      throw new Error('Failed to create animal');
    }
    return response.json();
  }
);

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addToOfflineQueue: (state, action: PayloadAction<Animal>) => {
      state.offlineQueue.push(action.payload);
    },
    clearOfflineQueue: (state) => {
      state.offlineQueue = [];
    },
    reconcileAnimals: (state, action: PayloadAction<{ tempId: string; realId: string }[]>) => {
      // Update temp IDs with real IDs after sync
      action.payload.forEach(({ tempId, realId }) => {
        const animalIndex = state.animals.findIndex(a => a.tempId === tempId);
        if (animalIndex >= 0) {
          state.animals[animalIndex].id = realId;
          delete state.animals[animalIndex].tempId;
        }
      });
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch animals';
      })
      .addCase(createAnimal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.loading = false;
        state.animals.unshift(action.payload);
      })
      .addCase(createAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create animal';
      });
  },
});

export const { addToOfflineQueue, clearOfflineQueue, reconcileAnimals, setError } = animalsSlice.actions;
export default animalsSlice.reducer;