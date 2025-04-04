import { useDispatch, useSelector } from "react-redux";
import { resetTreino, setTreino } from "../../../slices/treino";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../../slices/store";
import { Messages } from "primereact/messages";
import { abrirModal } from "../../../slices/dialogs";
import { treinoAPI } from "../apis/treinoAPI";

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

interface TipoTreino {
  id: number;
  descricao: string;
}

const useTreino = () => {
  const dispatch = useDispatch();
  const treino = useSelector((state: RootState) => state.treino);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [tipoDeTreino, setipoDeTreino] = useState<TipoTreino[]>([]);
  const msg = useRef<Messages>(null);
  const api = treinoAPI();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    api.consultarExercicios().then(setExercicios);
    api.consultarTiposTreino().then(setipoDeTreino);
  }, []);

  const handleInsert = async () => {
    const treinoData = {
      descricao: treino.descricao,
      qtdSeries: treino.qtdSeries,
      carga_reconhecimento: treino.cargaReconhecimento,
      qtdSeriesValidas: treino.qtdSeriesValidas,
      carga_valida: treino.cargaValida,
      percepcaoEsforco: treino.percepcaoEsforco,
      data: treino.data ? formatDate(treino.data) : undefined,
      exercicio: { id: treino.exercicio?.id },
      tipoTreino: { id: treino.tipoTreino?.id },
    };

    const success = await api.inserirTreino(treinoData);

    if (success) {
      msg.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Treino inserido com sucesso!",
      });
      dispatch(resetTreino());
    } else {
      msg.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao inserir treino.",
      });
    }
  };

  const clear = () => {
    dispatch(resetTreino());
  };

  return {
    handleInsert,
    treino,
    exercicios,
    tipoDeTreino,
    msg,
    setTreino,
    clear,
    abrirModal
  };
};

export default useTreino;
