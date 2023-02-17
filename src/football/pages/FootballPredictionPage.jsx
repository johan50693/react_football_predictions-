import { Button, Grid, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BaseLayout } from '../layout/BaseLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RuleIcon from '@mui/icons-material/Rule'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'react-redux';
import { useAnswerStore } from '../../hooks';
import { FormModal } from '../components';
import { FormAnswer } from '../components/answer/FormAnswer';
import { useUiStore } from '../../hooks/useUiStore';
import { onActiveAnswer } from '../../store';

const formatGoalsA = (params) => {

    return params.row.a_goals_a;
}

const formatGoalsB = (params) => {

    return params.row.a_goals_b;
}

function getVersus(params) {
  return `vs`;
}

const formaResult = (params) => {

  if (params.row.m_penalties_a != null) {
    return `${params.row.m_goals_a} (${params.row.m_penalties_a}) - ${params.row.m_goals_b} (${params.row.m_penalties_b})`;
  } else {
    return `${params.row.m_goals_a} - ${params.row.m_goals_b}`;
  }
}

export const FootballPredictionPage = () => {

  let params = useParams();
  const {active} = useSelector( state => state.tournament);
  const { startLoadAnswers, answers } = useAnswerStore();
  const { openModal } = useUiStore();
  const dispatch = useDispatch();

  const columns = [
    { field: 'team_a', headerName: 'Equipo', flex: 1, minWidth: 100 },
    { field: 'a_goals_a', headerName: 'Goles', flex: 1, minWidth: 50, valueGetter: formatGoalsA },
    { field: 'vs', headerName: 'vs', flex: 1, minWidth: 10, valueGetter: getVersus },
    { field: 'a_goals_b', headerName: 'Goles', flex: 1, minWidth: 50, valueGetter: formatGoalsB },
    { field: 'team_b', headerName: 'Equipo', flex: 1, minWidth: 100 },
    { field: 'id', headerName: 'Resultado', flex: 1, minWidth: 100, valueGetter: formaResult },
    { 
      field: 'acciones', 
      headerName: 'Acciones', 
      flex: 1, 
      minWidth: 200,
      renderCell: (params) => {

        const answer = params.row;
        let newAnswer = {
          id: answer.id,
          poll_id: answer.poll_id,
          goals_a: (answer.a_goals_a == null) ? '': answer.a_goals_a,
          goals_b: (answer.a_goals_b == null) ? '': answer.a_goals_b,
          penalties_a: (answer.a_penalties_a == null) ? '': answer.a_penalties_a,
          penalties_b: (answer.a_penalties_b == null) ? '': answer.a_penalties_b,
        };

        const onClickVote = (e) => {
          dispatch(onActiveAnswer(newAnswer));
          openModal();
        };
  
        return (<Grid container
                      marginBottom={'10px'}
                      marginTop={'1px'}
                      spacing={2}
                      justifyContent='center'
                      alignItems='center'
                      directions="column">
                  <Grid item>
                    <Tooltip title="Votar">
                        <RuleIcon onClick={onClickVote}/>
                    </Tooltip>
                  </Grid>
                </Grid>
                );
      }

    }
  ];
  
  useEffect(() => {
    startLoadAnswers();
  }, [])

  return (
    <BaseLayout>
      <h1> {active.name} / Mis pronosticos</h1>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowHeight={() => 'auto'}
        rows={answers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    <FormModal>
        <FormAnswer/>
    </FormModal>
    </BaseLayout>
  )
}
