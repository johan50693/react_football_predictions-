import { Button, Grid, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useParams } from 'react-router-dom';
import { BaseLayout } from '../layout/BaseLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RuleIcon from '@mui/icons-material/Rule'
import EditIcon from '@mui/icons-material/Edit'

export const FootballPredictionPage = () => {

  let params = useParams();
  console.log(params.id); // "hotspur"

  const columns = [
    { field: 'equipo1', headerName: 'Equipo', flex: 1, minWidth: 100 },
    { field: 'goles1', headerName: 'Goles', flex: 1, minWidth: 50 },
    { field: 'vs', headerName: 'vs', flex: 1, minWidth: 40 },
    { field: 'goles2', headerName: 'Goles', flex: 1, minWidth: 50 },
    { field: 'equipo2', headerName: 'Equipo', flex: 1, minWidth: 100 },
    { field: 'puntos', headerName: 'Puntos', flex: 1, minWidth: 100 },
    { 
      field: 'acciones', 
      headerName: 'Acciones', 
      flex: 1, 
      minWidth: 200,
      renderCell: (params) => {
        // console.log(params.id);
      //TODO: Agregar modal para mostrar detalle de puntos asociado al partido seleccionado
        const onClickDetail = (e) => {
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
                    <Tooltip title="Detalle">
                        <RemoveRedEyeIcon onClick={onClickDetail}/>
                    </Tooltip>
                  </Grid>
                </Grid>
                );
      }

    }
  ];
  
  const rows = [
    { id: 1, equipo1: 'Barcelona', goles1: 1, vs: 'vs',equipo2: 'Español',goles2: 2, puntos: 2, acciones: null },
    { id: 2, equipo1: 'Real Madrid', goles1: 2, vs: 'vs',equipo2: 'Levante',goles2: 2, puntos: 2, acciones: null },
    { id: 3, equipo1: 'Manchester Utd', goles1: 2, vs: 'vs',equipo2: 'Manchester City',goles2: 2, puntos: 2, acciones: null },
    { id: 4, equipo1: 'PSG', goles1: 1, vs: 'vs',equipo2: 'Monaco',goles2: 2,puntos: 7, acciones: null },
    { id: 5, equipo1: 'Liverpool', goles1: 3, vs: 'vs',equipo2: 'Everton',goles2: 2, puntos: 2, acciones: null },
    { id: 6, equipo1: 'Villarreal', goles1: 4, vs: 'vs',equipo2: 'Vayadolid',goles2: 2, puntos: 2, acciones: null },
    { id: 7, equipo1: 'Tottenham', goles1: 0, vs: 'vs',equipo2: 'Fullham',goles2: 2, puntos: 2, acciones: null },
    { id: 8, equipo1: 'Chelsea', goles1: 1, vs: 'vs',equipo2: 'Aston Villa',goles2: 2, puntos: 2, acciones: null },
    { id: 9, equipo1: 'Arsenal', goles1: 2, vs: 'vs',equipo2: 'Newcastell',goles2: 2, puntos: 2, acciones: null },
  ];

  return (
    <BaseLayout>
      <h1>Liga 2022 / Pronosticos</h1>

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
