import { Button, Grid, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BaseLayout } from "../layout/BaseLayout"
import RuleIcon from '@mui/icons-material/Rule'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';

export const FootballPage = () => {

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth: 100 },
    { field: 'participantes', headerName: 'Participantes', flex: 1, minWidth: 150 },
    { field: 'fecha', headerName: 'Fecha', flex: 1, minWidth: 150 },
    { 
      field: 'acciones', 
      headerName: 'Acciones', 
      flex: 1, 
      minWidth: 200,
      renderCell: (params) => {
        // console.log(params.id);
        const onClickEdit = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const api = params.api;
          const thisRow= {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          return alert(JSON.stringify(thisRow, null, 4));
        };

        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const api = params.api;
          const thisRow= {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return (<Grid container
                      marginBottom={'10px'}
                      marginTop={'1px'}
                      spacing={2}
                      justifyContent='center'
                      alignItems='center'
                      directions="column">
                  <Grid item>
                    <Tooltip title="Editar">
                        <EditIcon onClick={onClickEdit}/>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Eliminar">
                        <DeleteIcon onClick={onClickDelete}/>
                    </Tooltip>
                  </Grid>
                </Grid>
                );
      }

    }
  ];
  
  const rows = [
    { id: 1, nombre: 'testName1', participantes: 'Snow', fecha: 'Jon', acciones: '<Button variant="text">Text</Button>' },
    { id: 2, nombre: 'testName2', participantes: 'Lannister', fecha: 'Cersei', acciones: 42 },
    { id: 3, nombre: 'testName3', participantes: 'Lannister', fecha: 'Jaime', acciones: 45 },
    { id: 4, nombre: 'testName4', participantes: 'Stark', fecha: 'Arya', acciones: 16 },
    { id: 5, nombre: 'testName5', participantes: 'Targaryen', fecha: 'Daenerys', acciones: null },
    { id: 6, nombre: 'testName6', participantes: 'Melisandre', fecha: null, acciones: 150 },
    { id: 7, nombre: 'testName7', participantes: 'Clifford', fecha: 'Ferrara', acciones: 44 },
    { id: 8, nombre: 'testName8', participantes: 'Frances', fecha: 'Rossini', acciones: 36 },
    { id: 9, nombre: 'testName9', participantes: 'Roxie', fecha: 'Harvey', acciones: 65 },
  ];

  return (
    <BaseLayout>
      <h1>Torneos Activos</h1>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        getRowHeight={() => 'auto'}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </BaseLayout>
  )
}
