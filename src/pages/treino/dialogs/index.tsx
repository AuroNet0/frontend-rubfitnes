import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { fecharModal } from "../../../slices/dialogs";
import { RootState } from "../../../slices/store";
import { incluirExercicio, limpar } from "../../../slices/exercicio";

interface ModalProps {
  id: string;
}

const DialogExercicio: React.FC<ModalProps> = ({ id }) => {
  const dispatch = useDispatch();
  const msg = useRef<Messages>(null);

  const estaAberto = useSelector((state: RootState) => state.dialogs.modaisAbertas[id]);

  const exercicio = useSelector((state: RootState) => state.exercicio) || { nome: "", descricao: "" };

  const handleInsert = async () => {
    const exercicioData = {
      nome: exercicio.nome,
      descricao: exercicio.descricao,
    };

    try {
      const response = await fetch("http://localhost:8080/exercicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercicioData),
      });
      
      console.log(exercicioData)
      if (!response.ok) {
        throw new Error("Erro ao inserir exercício");
      }

      msg.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Exercício inserido com sucesso!",
      });

      dispatch(limpar());
      dispatch(fecharModal(id)); 
    } catch (error) {
      msg.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao inserir exercício.",
      });
    }
  };

  return (
    <Dialog
      header="Adicionar Exercício"
      visible={!!estaAberto}
      onHide={() => dispatch(fecharModal(id))}
      footer={
        <div>
          <Button label="Fechar" icon="pi pi-times" onClick={() => dispatch(fecharModal(id))} className="p-button-text" />
          <Button label="Salvar" icon="pi pi-check" onClick={handleInsert} autoFocus />
        </div>
      }
    >
      <Messages ref={msg} />

      <div className="p-fluid">
        <InputText
          placeholder="Digite o nome do exercício..."
          value={exercicio.nome}
          onChange={(e) => dispatch(incluirExercicio({ field: "nome", value: e.target.value }))}
        />
        <InputText
          placeholder="Digite uma descrição"
          value={exercicio.descricao}
          onChange={(e) => dispatch(incluirExercicio({ field: "descricao", value: e.target.value }))}
        />
      </div>
    </Dialog>
  );
};

export default DialogExercicio;
