import { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./slices/store";
import { Messages } from "primereact/messages";
import {
  resetTreino,
  setCargaReconhecimento,
  setCargaValida,
  setData,
  setDescricao,
  setExercicio,
  setPercepcaoEsforco,
  setQtdSeries,
  setQtdSeriesValidas,
} from "./slices/treino";

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

export default function App() {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const msg = useRef<Messages>(null);

  const dispatch = useDispatch();

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

  const treino = useSelector((state: RootState) => state.treino);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInsert = () => {
    const treinoData = {
      descricao: treino.descricao,
      qtdSeries: treino.qtdSeries,
      carga_reconhecimento: treino.cargaReconhecimento,
      qtdSeriesValidas: treino.qtdSeriesValidas,
      carga_valida: treino.cargaValida,
      percepcaoEsforco: treino.percepcaoEsforco,
      data: treino.data ? formatDate(treino.data) : undefined,
      exercicio: {
        id: treino.exercicio?.id,
      },
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

  return (
    <div className="form-container">
      <Messages ref={msg} />
      <div className="dropdown-container">
        <Dropdown
          value={treino.exercicio}
          onChange={(e) => dispatch(setExercicio(e.value))}
          options={exercicios}
          optionLabel="nome"
          placeholder="Selecione um exercício"
          filter
          className="dropdown"
        />
      </div>

      <div className="input-group-container">
        <InputNumber
          value={treino.qtdSeries}
          onValueChange={(e) => dispatch(setQtdSeries(e.value as number))}
          placeholder="Quantidade de séries"
        />
        <InputNumber
          value={treino.qtdSeriesValidas}
          onValueChange={(e) =>
            dispatch(setQtdSeriesValidas(e.value as number))
          }
          placeholder="Quantidade de séries válidas"
        />
        <InputNumber
          value={treino.cargaReconhecimento}
          onValueChange={(e) =>
            dispatch(setCargaReconhecimento(e.value as number))
          }
          placeholder="Carga de reconhecimento"
        />
        <InputNumber
          value={treino.cargaValida}
          onValueChange={(e) => dispatch(setCargaValida(e.value as number))}
          placeholder="Carga válida"
        />
        <InputNumber
          value={treino.percepcaoEsforco}
          onValueChange={(e) =>
            dispatch(setPercepcaoEsforco(e.value as number))
          }
          placeholder="Percepção de esforço 0 - 10"
        />
      </div>

      <div className="textarea-calendar-container">
        <InputTextarea
          value={treino.descricao}
          onChange={(e) => dispatch(setDescricao(e.target.value))}
          rows={5}
          cols={30}
          className="textarea"
        />
        <Calendar
          value={treino.data}
          onChange={(e) => dispatch(setData(e.target.value as Date))}
          showIcon
        />
      </div>

      <div className="button-container">
        <Button
          label="Inserir"
          icon="pi pi-check"
          onClick={handleInsert}
          className="button"
        />
      </div>
    </div>
  );
}
  