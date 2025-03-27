import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Exercicio {
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
  percepcaoEsforco: number| undefined;
  data: Date | undefined;
  exercicio: Exercicio | undefined;
}

const initialState: TreinoState = {
  descricao: '',
  qtdSeries: undefined,
  qtdSeriesValidas: undefined,
  cargaReconhecimento: undefined,
  cargaValida: undefined,
  percepcaoEsforco: undefined,
  data: undefined,
  exercicio: undefined,
};

const treinoSlice = createSlice({
  name: 'treino',
  initialState,
  reducers: {
    setDescricao: (state, action: PayloadAction<string>) => {
      state.descricao = action.payload;
    },
    setQtdSeries: (state, action: PayloadAction<number>) => {
      state.qtdSeries = action.payload;
    },
    setQtdSeriesValidas: (state, action: PayloadAction<number>) => {
      state.qtdSeriesValidas = action.payload;
    },
    setCargaReconhecimento: (state, action: PayloadAction<number>) => {
      state.cargaReconhecimento = action.payload;
    },
    setCargaValida: (state, action: PayloadAction<number>) => {
      state.cargaValida = action.payload;
    },
    setPercepcaoEsforco: (state, action: PayloadAction<number>) => {
      state.percepcaoEsforco = action.payload;
    },
    setData: (state, action: PayloadAction<Date>) => {
      state.data = action.payload;
    },
    setExercicio: (state, action: PayloadAction<Exercicio>) => {
      state.exercicio = action.payload;
    },
    resetTreino: () => initialState,
  },
});

export const {
  setDescricao,
  setQtdSeries,
  setQtdSeriesValidas,
  setCargaReconhecimento,
  setCargaValida,
  setPercepcaoEsforco,
  setData,
  setExercicio,
  resetTreino,
} = treinoSlice.actions;

export default treinoSlice.reducer;
