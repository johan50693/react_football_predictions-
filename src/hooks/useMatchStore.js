import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import footballApi from '../apis/footballApi';
import { onDeleteMatch, onLoadMatch } from '../store/match/matchSlice';

export const useMatchStore = () => {
  
  const {matches} = useSelector(state => state.match);
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

  return {
    // * Propiedades
    matches,
    // * Metodos
    startLoadMatches,
    startAssignToTournament,
    startDeleteMatch
  }
}
