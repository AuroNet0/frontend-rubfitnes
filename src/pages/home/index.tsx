import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useHome from "./hooks/useHome";
import "../home/css/style.css";
import { format } from "date-fns";

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
          <Column field="descricao" header="Descrição" ></Column>
          <Column field="qtdSeries" header="Qtd Séries" ></Column>
          <Column
            field="cargaReconhecimento"
            header="Reconhecimento"
            
          ></Column>
          <Column field="qtdSeriesValidas" header="Qtd Válidas" ></Column>
          <Column field="cargaValida" header="Válida" ></Column>
          <Column field="percepcaoEsforco" header="Percepção" ></Column>
          <Column
            field="date"
            header="Data"
            body={(rowData) =>
              rowData.date ? format(rowData.date, "dd/MM/yyyy") : ""
            }
          />
          <Column field="exercicioNome" header="Exercicio" ></Column>
          <Column field="tipoTreinoDescricao" header="Tipo" filter ></Column>
          <Column field="acoes" header="Ações" ></Column>
        </DataTable>
      </div>
    </div>
  );
}
