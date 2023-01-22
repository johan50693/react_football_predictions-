import { Button, Grid, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BaseLayout } from "../layout/BaseLayout"
import RuleIcon from '@mui/icons-material/Rule'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import { useTournamentsStore } from "../../hooks/useTournamentsStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onActiveTournament } from "../../store/tournaments/tournamentSlice";

export const FootballPage = () => {

  const { startLoadTournaments, tournaments} = useTournamentsStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                winner_selection
              } = params.row;

        const onClickCreate = (e) => {
          navigate('/tournament/create');
          return;
          e.stopPropagation(); // don't select this row after clicking
          const api = params.api;
          const thisRow= {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          // return alert(JSON.stringify(thisRow, null, 4));
          return '<Button variant="text">Text</Button>';
        };

        const onClickEdit = (e) => {
          dispatch(onActiveTournament({id,name,description,exact_marker,goals_difference,goals_of_a_team,winner_selection}));
          navigate('/tournament/show/'+params.id);
          return;
          e.stopPropagation(); // don't select this row after clicking
          const api = params.api;
          const thisRow= {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          // return alert(JSON.stringify(thisRow, null, 4));
          return '<Button variant="text">Text</Button>';
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
                        <RuleIcon onClick={onClickCreate}/>
                    </Tooltip>
                  </Grid><Grid item>
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
  
  useEffect(() => {
    startLoadTournaments();
  }, [])

  return (
    <BaseLayout>
      <h1>Torneos Activos</h1>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tournaments}
        getRowHeight={() => 'auto'}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5,10,15]}
        // checkboxSelection
      />
    </div>
    </BaseLayout>
  )
}
