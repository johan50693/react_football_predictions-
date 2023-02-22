import { Button, Grid, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { BaseLayout } from '../../layout/BaseLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMatchStore } from '../../../hooks/useMatchStore';
import { useDispatch, useSelector } from 'react-redux';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import { FormModal } from '../../components';
import { FormMatch } from '../../components/match/FormMatch';
import { useUiStore } from '../../../hooks/useUiStore';
import { onActiveMatch, onClearActiveMatch } from '../../../store/match/matchSlice';

function getVersus(params) {
  return `vs`;
}

const formatGoalsA = (params) => {

  if (params.row.penalties_a != null) {
    return `${params.row.goals_a} (${params.row.penalties_a})`;
  } else {
    return params.row.goals_a;
  }
}

const formatGoalsB = (params) => {

  if (params.row.penalties_a != null) {
    return `(${params.row.penalties_b}) ${params.row.goals_b}`;
  } else {
    return params.row.goals_b;
  }
}

export const FootballMatchPage = () => {

  const { openModal, closeModal} = useUiStore();
  const {startLoadMatches, matches, startAssignToTournament, startDeleteMatch, startCheckCreateByWeek, startCheckUpdateByDay} = useMatchStore();
  const { active } = useSelector(state => state.tournament);
  const dispatch = useDispatch();
  
  const createMatch = () => {
    dispatch(onClearActiveMatch());
    openModal();
  }

  const columns = [
    { field: 'league', headerName: 'Torneo', flex: 1, minWidth: 100 },
    { field: 'team_a', headerName: 'Equipo', flex: 1, minWidth: 100 },
    { field: 'goals_a', headerName: 'Goles', flex: 1, minWidth: 50, valueGetter: formatGoalsA },
    { field: 'vs', headerName: 'vs', flex: 1, minWidth: 40, valueGetter: getVersus, },
    { field: 'goals_b', headerName: 'Goles', flex: 1, minWidth: 50, valueGetter: formatGoalsB },
    { field: 'team_b', headerName: 'Equipo', flex: 1, minWidth: 100 },
    { field: 'date', headerName: 'Fecha', flex: 1, minWidth: 100 },
    { 
      field: 'acciones', 
      headerName: 'Acciones', 
      flex: 1, 
      minWidth: 200,
      renderCell: (params) => {

        const match = params.row;
        let newMatch = {
          id: (match.id == null) ? '': match.id,
          league: (match.league == null) ? '': match.league,
          team_a: (match.team_a == null) ? '': match.team_a,
          team_b: (match.team_b == null) ? '': match.team_b,
          goals_a: (match.goals_a == null) ? '': match.goals_a,
          goals_b: (match.goals_b == null) ? '': match.goals_b,
          penalties_a: (match.penalties_a == null) ? '': match.penalties_a,
          penalties_b: (match.penalties_b == null) ? '': match.penalties_b,
          date: (match.date == null) ? '': match.date,
        };
        

        const onClickEdit = (e) => {
          dispatch(onActiveMatch(newMatch));
          openModal();
        };
        
        const onClickAssign = (e) => {
          
          Swal.fire({
            title: `Confirmación`,
            text: `¿Quieres agregar el partido  ${params.row.team_a} vs ${params.row.team_b} a una encuesta?`,
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              try {
                const result = startAssignToTournament(active.id,params.id)

              } catch (error) {
                console.log(error)
              }
            } else if (result.isDenied) {
              // Swal.fire('Changes are not saved', '', 'info')
            }
          })
        };

        const onClickDelete = (e) => {
          Swal.fire({
            title: `Confirmación`,
            text: `¿Quieres eliminar el partido ${params.row.team_a} vs ${params.row.team_b}?`,
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              try {
                startDeleteMatch({id:params.id});
              } catch (error) {
                console.log(error)
              }
            } else if (result.isDenied) {
              // Swal.fire('Changes are not saved', '', 'info')
            }
          })
        };
  
        return (<Grid container
                      marginBottom={'10px'}
                      marginTop={'1px'}
                      spacing={2}
                      justifyContent='center'
                      alignItems='center'
                      directions="column">
                  <Grid item>
                    <Tooltip title="Editar partido">
                        <EditIcon onClick={onClickEdit}/>
                    </Tooltip>
                    <Tooltip title="Agregar encuesta">
                        <PanToolAltIcon onClick={onClickAssign}/>
                    </Tooltip>
                    {/* <Tooltip title="Eliminar">
                        <DeleteIcon onClick={onClickDelete}/>
                    </Tooltip> */}
                  </Grid>
                </Grid>
                );
      }

    }
  ];
  
  useEffect(() => {
    startLoadMatches();
    startCheckCreateByWeek();
    startCheckUpdateByDay();
  }, [])
  
  return (
    <BaseLayout>
      <h1>{active.name} / Partidos</h1>

      <div style={{ height: 400, width: '100%' }}>
      <Grid container 
                  spacing={2} 
                  justifyContent='center'
                  alignItems='left'
                  directions= "column">
              <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{mb:2}}

            >
              <Button 
                      fullWidth
                      onClick={() => createMatch()}
                      type="submit"
                      variant="contained">
                        Crear
              </Button>
            </Grid>
        </Grid>
        <DataGrid
          getRowHeight={() => 'auto'}
          rows={matches}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5,10,15]}
        />
      </div>
      <FormModal>
          <FormMatch/>
      </FormModal>
    </BaseLayout>
  )
}
