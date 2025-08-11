import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SyncOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  data: any;
  tempId?: string;
  timestamp: number;
}

interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: number | null;
  pendingOperations: SyncOperation[];
  syncErrors: string[];
}

const initialState: SyncState = {
  isOnline: navigator.onLine,
  isSyncing: false,
  lastSyncTime: null,
  pendingOperations: [],
  syncErrors: [],
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
    addPendingOperation: (state, action: PayloadAction<SyncOperation>) => {
      state.pendingOperations.push(action.payload);
    },
    removePendingOperation: (state, action: PayloadAction<string>) => {
      state.pendingOperations = state.pendingOperations.filter(
        op => op.id !== action.payload
      );
    },
    clearPendingOperations: (state) => {
      state.pendingOperations = [];
    },
    setLastSyncTime: (state, action: PayloadAction<number>) => {
      state.lastSyncTime = action.payload;
    },
    addSyncError: (state, action: PayloadAction<string>) => {
      state.syncErrors.push(action.payload);
    },
    clearSyncErrors: (state) => {
      state.syncErrors = [];
    },
  },
});

export const {
  setOnlineStatus,
  setSyncing,
  addPendingOperation,
  removePendingOperation,
  clearPendingOperations,
  setLastSyncTime,
  addSyncError,
  clearSyncErrors,
} = syncSlice.actions;

export default syncSlice.reducer;