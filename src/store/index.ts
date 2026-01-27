import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import petReducer from './petSlice';
import tutorReducer from './tutorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
    tutores: tutorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
