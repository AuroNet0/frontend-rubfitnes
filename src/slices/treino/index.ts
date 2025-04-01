import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

interface TipoTreino {
  id: number;
  nome: string;
  descricao: string;
}

interface TreinoState {
  descricao: string;
  qtdSeries: number | undefined;
  qtdSeriesValidas: number | undefined;
  cargaReconhecimento: number | undefined;
  cargaValida: number | undefined;
  percepcaoEsforco: number | undefined;
  data: Date | undefined;
  exercicio: Exercicio | undefined;
  tipoTreino: TipoTreino | undefined;
}

export const initialState: TreinoState = {
  descricao: "",
  qtdSeries: undefined,
  qtdSeriesValidas: undefined,
  cargaReconhecimento: undefined,
  cargaValida: undefined,
  percepcaoEsforco: undefined,
  data: undefined,
  exercicio: undefined,
  tipoTreino: undefined,
};

const treinoSlice = createSlice({
  name: "treino",
  initialState,
  reducers: {
    setTreino: <K extends keyof TreinoState>(
      state: TreinoState,
      action: PayloadAction<{ field: K; value: TreinoState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetTreino: () => initialState,
  },
});

export const { setTreino, resetTreino } = treinoSlice.actions;

export default treinoSlice.reducer;
