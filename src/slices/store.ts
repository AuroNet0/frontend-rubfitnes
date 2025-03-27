import { configureStore } from '@reduxjs/toolkit';
import treinoReducer from './treino/index';

export const store = configureStore({
  reducer: {
    treino: treinoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
