import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from './slices/animalsSlice';
import authReducer from './slices/authSlice';
import syncReducer from './slices/syncSlice';

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    auth: authReducer,
    sync: syncReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firebase timestamp objects
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user.createdAt', 'auth.user.lastLoginAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;