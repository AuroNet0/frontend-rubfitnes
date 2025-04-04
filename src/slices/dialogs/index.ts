import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EstadoDialogos {
  modaisAbertas: Record<string, boolean>; // Objeto onde a chave é o ID da modal
}

const estadoInicial: EstadoDialogos = {
  modaisAbertas: {},
};

const dialogSlice = createSlice({
  name: "dialogos",
  initialState: estadoInicial,
  reducers: {
    abrirModal: (state, action: PayloadAction<string>) => {
      state.modaisAbertas[action.payload] = true; // Abre a modal específica
    },
    fecharModal: (state, action: PayloadAction<string>) => {
      state.modaisAbertas[action.payload] = false; // Fecha a modal específica
    },
  },
});

export const { abrirModal, fecharModal } = dialogSlice.actions;
export default dialogSlice.reducer;
