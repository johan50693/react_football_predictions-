import { Button, Grid, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import { useTournamentsStore } from "../../hooks/useTournamentsStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onActiveTournament, onClearActiveTournament } from "../../store/tournaments/tournamentSlice";
import Swal from "sweetalert2";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { FormModal, FormTournament } from "../components";
import { useUiStore } from "../../hooks/useUiStore";
import { BaseLayout } from "../layout/BaseLayout";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { onCloseAssigned, onOpenAssigned } from "../../store";

export const FootballPage = () => {

  const { startLoadTournaments, tournaments, startDeleteTournament} = useTournamentsStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal} = useUiStore();
  const {user} = useSelector( state => state.auth);
  const columns = [
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 100},
    { field: 'description', headerName: 'Descripción', flex: 1, minWidth: 150},
    { 
      field: 'acciones', 
      headerName: 'Acciones', 
      flex: 1, 
      minWidth: 200,
      renderCell: (params) => {
        // console.log(params.id);
        const { description, 
                exact_marker,
                goals_difference,
                goals_of_a_team,
                id,
                name,
                winner_selection,
                createdby
              } = params.row;

        const canAlter = () => {
          if(user.uid == createdby){
            return true;
          }
          return false;
        }
        const onClickDetail = (e) => {
          dispatch(onActiveTournament({id,name,description,exact_marker,goals_difference,goals_of_a_team,winner_selection}));
          navigate(`/tournament/${params.id}/prediction`);
          return;
        };

        const onClickEdit = (e) => {
          dispatch(onActiveTournament({id,name,description,exact_marker,goals_difference,goals_of_a_team,winner_selection}));
          dispatch(onCloseAssigned());
          openModal();
        };

        const onClickAssign = (e) => {
          dispatch(onActiveTournament({id,name,description,exact_marker,goals_difference,goals_of_a_team,winner_selection}));
          dispatch(onOpenAssigned());
          openModal();
        };

        const onClickDelete = (e) => {
          
          Swal.fire({
            title: `Confirmación`,
            text: `¿Quieres eliminar el torneo ${params.row.name}?`,
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              try {
                startDeleteTournament({id:params.id});
                // Swal.fire('Torneo eliminado', '', 'success')
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
                    <Tooltip title="ver">
                        <RemoveRedEyeIcon onClick={onClickDetail}/>
                    </Tooltip>
                  </Grid>
                    { (canAlter())
                      ? (
                        <>
                          <Grid item>
                            <Tooltip title="Agregar usuario">
                                <PanToolAltIcon onClick={onClickAssign}/>
                            </Tooltip>
                          </Grid>
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
                        </>
                      )
                      :null

                    }
                </Grid>
                );
      }

    }
  ];
  
  useEffect(() => {
    startLoadTournaments();
  }, [])

  const createTournament = () => {
    dispatch(onClearActiveTournament());
    dispatch(onCloseAssigned());
    openModal();
  }
  return (
    <BaseLayout>
      <h1>Torneos Activos</h1>

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
                      onClick={() => createTournament()}
                      type="submit"
                      variant="contained">
                        Crear
              </Button>
            </Grid>
            </Grid>
      <DataGrid
        rows={tournaments}
        getRowHeight={() => 'auto'}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5,10,15]}
        // checkboxSelection
      />
    </div>
      <FormModal>
          <FormTournament/>
      </FormModal>
    </BaseLayout>
  )
}
