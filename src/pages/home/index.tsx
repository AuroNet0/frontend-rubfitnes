import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useHome from "./hooks/useHome";
import "../home/css/style.css";

export default function Home() {
  const { treinos } = useHome();

  return (
    <div className="home-container">
      <h1>Bem-vindo ao RubFitnes</h1>
      <p>Gerencie seus treinos de forma fácil e eficiente.</p>

      <div className="table-container">
        <DataTable
          value={treinos}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="descricao" header="Descrição" filter></Column>
          <Column field="qtdSeries" header="Qtd Séries" filter></Column>
          <Column
            field="cargaReconhecimento"
            header="Reconhecimento"
            filter
          ></Column>
          <Column field="qtdSeriesValidas" header="Qtd Válidas" filter></Column>
          <Column field="cargaValida" header="Válida" filter></Column>
          <Column field="percepcaoEsforco" header="Percepção" filter></Column>
          <Column field="date" header="Data" filter></Column>
          <Column field="exercicioNome" header="Exercicio" filter></Column>
          <Column field="tipoTreinoDescricao" header="Tipo" filter></Column>
          <Column field="acoes" header="Ações" filter></Column>
        </DataTable>
      </div>
    </div>
  );
}
