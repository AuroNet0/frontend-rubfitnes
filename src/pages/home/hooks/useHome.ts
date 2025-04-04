import { useEffect, useState } from "react";
import { homeAPI } from "../apis/homeAPI";
import { isValid, parseISO } from "date-fns";

interface Treino {
  id: number;
  descricao: string;
  qtdSeries: number;
  cargaReconhecimento: number;
  qtdSeriesValidas: number;
  cargaValida: number;
  percepcaoEsforco: number;
  date: string;
  exercicioNome: string;
  tipoTreinoDescricao: string;
}

const useHome = () => {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const api = homeAPI();

  useEffect(() => {
    api.consultarTreinos().then((response) => {
      const treinosConvertidos = response.map((treino: any) => ({
        ...treino,
        date: isValid(parseISO(treino.data)) ? parseISO(treino.data) : null,
      }));
      setTreinos(treinosConvertidos);
    });
  }, []);
  

  return {
    treinos
  };
};

export default useHome;
