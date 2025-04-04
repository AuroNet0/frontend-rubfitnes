import { configureStore } from "@reduxjs/toolkit";
import treinoReducer from "./treino/index";
import  dialogReducer from "./dialogs/index"
import exercicioReducer from "./exercicio/index"

export const store = configureStore({
  reducer: {
    treino: treinoReducer,
    dialogs: dialogReducer,
    exercicio: exercicioReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
