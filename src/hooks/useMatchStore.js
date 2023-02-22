import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import footballApi from '../apis/footballApi';
import { onAddNewMatch, onDeleteMatch, onLoadMatch, onUpdateMatch } from '../store/match/matchSlice';
import { useUiStore } from './useUiStore';

export const useMatchStore = () => {
  
  const {matches} = useSelector(state => state.match);
  const {closeModal} = useUiStore();
  const dispatch = useDispatch();

  const startLoadMatches = async () => {

    try {
      const {data} = await footballApi.get('/match/list');
      dispatch(onLoadMatch(data.data))
    } catch (error) {
      console.log(error);
    }
  }

  const startDeleteMatch = async ({id}) => {

    try {
      const {data} = await footballApi.delete(`/match/${id}`);
      Swal.fire('',data.message, 'success');
      dispatch(onDeleteMatch({id}))
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message, '', 'info');
    }
  }

  const startAssignToTournament = async (tournament_id,matches_id) => {

    try {
      const body = {tournament_id,matches_id};
      const {data} = await footballApi.post('/match/assignToTournament',body);
      Swal.fire(data.message, '', 'success');
      // console.log(data);
      
    } catch (error) {
      // console.log(error);
      Swal.fire(error.response.data.message, '', 'info');
    }
  }

  const startUpdateMatch = async ({id,league,team_a,team_b,goals_a,goals_b,penalties_a,penalties_b,date}) => {
    try {
      const body = {id, league, team_a,team_b,
        goals_a: (goals_a === '') ? null: goals_a,
        goals_b: (goals_b === '') ? null: goals_b,
        penalties_a: (penalties_a === '') ? null: penalties_a,
        penalties_b: (penalties_b === '') ? null: penalties_b,
        date
      };

      const {data} = await footballApi.put(`/match/${id}`,body);
      dispatch(onUpdateMatch(body));
      closeModal();
      Swal.fire(data.message, '', 'success');
      dispatch(onClearActiveMatch());
      
    } catch (error) {
      // console.log(error);
      Swal.fire(error.response.data.message, '', 'info');
    }
  }

  const startCreateMatch = async ({id,league,team_a,team_b,goals_a,goals_b,penalties_a,penalties_b,date}) => {
    try {
      const body = {league, team_a,team_b,
        goals_a: (goals_a === '') ? null: goals_a,
        goals_b: (goals_b === '') ? null: goals_b,
        penalties_a: (penalties_a === '') ? null: penalties_a,
        penalties_b: (penalties_b === '') ? null: penalties_b,
        date
      };

      const {data} = await footballApi.post(`/match/create`,body);
      closeModal();
      startLoadMatches();
      Swal.fire(data.message, '', 'success');
      
    } catch (error) {
      Swal.fire(error.response.data.message, '', 'info');
    }
  }

  const startCheckUpdateByDay = async () => {

    try {
      await footballApi.put('/match/checkupdatebyday/results');
    } catch (error) {
      console.log(error);
    }
  }

  const startCheckCreateByWeek = async () => {

    try {
      await footballApi.put('/match/checkcreatebyweek/results');
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // * Propiedades
    matches,
    // * Metodos
    startLoadMatches,
    startAssignToTournament,
    startDeleteMatch,
    startUpdateMatch,
    startCreateMatch,
    startCheckUpdateByDay,
    startCheckCreateByWeek
  }
}
