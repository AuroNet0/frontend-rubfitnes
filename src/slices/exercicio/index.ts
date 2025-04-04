import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Exercicio {
  nome: string;
  descricao: string;
}

export const initialState: Exercicio = {
  nome: "",
  descricao: ""
};

const treinoSlice = createSlice({
  name: "treino",
  initialState,
  reducers: {
    incluirExercicio: <K extends keyof Exercicio>(
      state: Exercicio,
      action: PayloadAction<{ field: K; value: Exercicio[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    limpar: () => initialState,
  },
});

export const { incluirExercicio, limpar } = treinoSlice.actions;

export default treinoSlice.reducer;
