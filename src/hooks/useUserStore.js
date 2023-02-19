import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import footballApi from '../apis/footballApi';
import { onLoadUsers } from '../store';
import { useUiStore } from './useUiStore';

export const useUserStore = () => {
  
  const {usersPoints} = useSelector( state => state.user);
  const {active} = useSelector( state => state.tournament);
  const dispatch = useDispatch();
  const {closeModal} = useUiStore();

  const startLoadUsers = async () => {

    try {
      const {data} = await footballApi.get(`/user/list/points/${active.id}`);
      dispatch(onLoadUsers(data.dataResponse))
    } catch (error) {
      console.log(error);
    }
  }

  const startAssignUserToTournament = async ({email,tournament_id}) => {

    try {
      const body = {
        email,
        tournament_id
      };

      const {data} = await footballApi.post(`/user/assignToTournament`, body);
      closeModal();
      Swal.fire(data.message, '', 'success');
      
    } catch (error) {
      closeModal();
      console.log(error);
      Swal.fire(error.response.data.message, '', 'info');
    }
  }
  
  return {
    // Atributos
    usersPoints,
    // Metodos
    startLoadUsers,
    startAssignUserToTournament,
  }
}
