import { useEffect, useState } from "react";

interface Treino {
  id: number;
  descricao: string;
  qtdSeries: number;
  cargaReconhecimento: number;
  qtdSeriesValidas: number;
  cargaValida: number;
  percepcaoEsforco: number;
  date: Date;
  exercicioNome: string;
  tipoTreinoDescricao: string;
}

const useHome = () => {
  const [treinos, setTreinos] = useState<Treino[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/treinos")
      .then((response) => response.json())
      .then((data) => {
        setTreinos(data);
      })
      .catch((error) =>
        console.error("Erro ao carregar os exercícios:", error)
      );
  }, []);

  const formatDate = (date: Date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return {
    treinos,
    formatDate,
  };
};

export default useHome;
