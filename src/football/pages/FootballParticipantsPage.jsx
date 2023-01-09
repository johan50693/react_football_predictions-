import { Grid, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BaseLayout } from "../layout/BaseLayout";
import DeleteIcon from '@mui/icons-material/Delete';

export const FootballParticipantsPage = () => {

  const columns = [
    //TODO: Definir renderCell para agregar inpusts dinamicos a los campos de goles
    { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth: 100 },
    { field: 'puntos', headerName: 'Puntos', flex: 1, minWidth: 50 },
  ];
  
  const rows = [
    { id: 1, nombre: 'Barcelona', puntos: 10 },
    { id: 2, nombre: 'Real Madrid', puntos: 9 },
    { id: 3, nombre: 'Manchester Utd', puntos: 8 },
    { id: 4, nombre: 'PSG', puntos: 7 },
    { id: 5, nombre: 'Liverpool', puntos: 6 },
    { id: 6, nombre: 'Villarreal', puntos: 5 },
    { id: 7, nombre: 'Tottenham', puntos: 4 },
    { id: 8, nombre: 'Chelsea', puntos: 3 },
    { id: 9, nombre: 'Arsenal', puntos: 2 },
  ];

  return (
    <BaseLayout>
      <h1>Liga 2022 / Participantes</h1>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowHeight={() => 'auto'}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </BaseLayout>
  )
}
