import { Grid, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BaseLayout } from "../layout/BaseLayout";
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserStore } from "../../hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const FootballParticipantsPage = () => {

  const {startLoadUsers, usersPoints} = useUserStore();
  const { active } = useSelector( state => state.tournament);
  const columns = [
    //TODO: Definir renderCell para agregar inpusts dinamicos a los campos de goles
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 100},
    { field: 'points', headerName: 'Puntos', flex: 1, minWidth: 50 },
  ];
  
  useEffect(() => {
    startLoadUsers();
  }, [])
  
  return (
    <BaseLayout>
      <h1>{active.name} / Participantes</h1>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={usersPoints}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    </BaseLayout>
  )
}
