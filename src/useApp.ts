import { useDispatch, useSelector } from "react-redux";
import { resetTreino, setTreino } from "./slices/treino";
import { useEffect, useRef, useState } from "react";
import { RootState } from "./slices/store";
import { Messages } from "primereact/messages";

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

interface TipoTreino {
  id: number;
  descricao: string;
}

const useApp = () => {
  const dispatch = useDispatch();
  const treino = useSelector((state: RootState) => state.treino);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [tipoDeTreino, setipoDeTreino] = useState<TipoTreino[]>([]);
  const msg = useRef<Messages>(null);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetch("http://localhost:8080/exercicios")
      .then((response) => response.json())
      .then((data) => {
        setExercicios(data);
      })
      .catch((error) =>
        console.error("Erro ao carregar os exercícios:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/tipos")
      .then((response) => response.json())
      .then((data) => {
        setipoDeTreino(data);
      })
      .catch((error) =>
        console.error("Erro ao carregar os exercícios:", error)
      );
  }, []);

  const handleInsert = () => {
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

    fetch("http://localhost:8080/treinos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(treinoData),
    })
      .then((response) => response.json())
      .then(() => {
        msg.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Treino inserido com sucesso!",
        });
        dispatch(resetTreino());
      })
      .catch(() => {
        msg.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao inserir treino.",
        });
      });
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
  };
};

export default useApp;
