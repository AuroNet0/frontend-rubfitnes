import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { useDispatch } from "react-redux";
import { Messages } from "primereact/messages";
import useApp from "./useApp";
import "./assets/App.css";

export default function App() {
  const {
    treino,
    handleInsert,
    exercicios,
    tipoDeTreino,
    msg,
    setTreino,
    clear,
  } = useApp();
  const dispatch = useDispatch();

  return (
    <div className="form-container">
      <Messages ref={msg} />
      <div className="dropdown-container">
        <Dropdown
          value={treino.tipoTreino}
          onChange={(e) =>
            dispatch(setTreino({ field: "tipoTreino", value: e.value }))
          }
          options={tipoDeTreino}
          optionLabel="descricao"
          placeholder="Selecione um tipo de treino"
          filter
          className="dropdown"
        />
        <Dropdown
          value={treino.exercicio}
          onChange={(e) =>
            dispatch(setTreino({ field: "exercicio", value: e.value }))
          }
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
          onValueChange={(e) =>
            dispatch(
              setTreino({ field: "qtdSeries", value: e.value as number })
            )
          }
          placeholder="Quantidade de séries"
        />
        <InputNumber
          value={treino.qtdSeriesValidas}
          onValueChange={(e) =>
            dispatch(
              setTreino({ field: "qtdSeriesValidas", value: e.value as number })
            )
          }
          placeholder="Quantidade de séries válidas"
        />
        <InputNumber
          value={treino.cargaReconhecimento}
          onValueChange={(e) =>
            dispatch(
              setTreino({
                field: "cargaReconhecimento",
                value: e.value as number,
              })
            )
          }
          placeholder="Carga de reconhecimento"
        />
        <InputNumber
          value={treino.cargaValida}
          onValueChange={(e) =>
            dispatch(
              setTreino({ field: "cargaValida", value: e.value as number })
            )
          }
          placeholder="Carga válida"
        />
        <InputNumber
          value={treino.percepcaoEsforco}
          onValueChange={(e) =>
            dispatch(
              setTreino({ field: "percepcaoEsforco", value: e.value as number })
            )
          }
          placeholder="Percepção de esforço 0 - 10"
        />
      </div>

      <div className="textarea-calendar-container">
        <InputTextarea
          value={treino.descricao}
          onChange={(e) =>
            dispatch(setTreino({ field: "descricao", value: e.target.value }))
          }
          rows={5}
          cols={30}
          className="textarea"
        />
        <Calendar
          value={treino.data}
          onChange={(e) =>
            dispatch(
              setTreino({ field: "data", value: e.target.value as Date })
            )
          }
          showIcon
        />
      </div>

      <div className="button-container">
        <Button
          label="Inserir"
          icon="pi pi-check"
          onClick={handleInsert}
          className="buttonInsert"
        />
        <Button
          label="Limpar"
          icon="pi pi-trash"
          onClick={clear}
          className="buttonClear"
        />
      </div>
    </div>
  );
}
