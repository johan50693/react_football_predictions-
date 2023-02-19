import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import footballApi from '../apis/footballApi';
import { onChecking } from '../store';
import { onAddNewTournament, onDeleteTournament, onLoadTournaments, onUpdateTournament } from '../store/tournaments/tournamentSlice';
import { useUiStore } from './useUiStore';

export const useTournamentsStore = () => {
  
  const {tournaments, tournamentSelected} = useSelector( state => state.tournament );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal, closeModal, open } = useUiStore();

  const startLoadTournaments = async () => {

    try {
      const {data} = await footballApi.get('/tournament/list');
      dispatch(onLoadTournaments(data));
    } catch (error) {
      
    }
  }

  const startCreateTournament = async ({name, description, exact_marker, goals_difference, winner_selection, goals_of_a_team }) => {

    try {
      const body ={
        name,
        description,
        exact_marker,
        winner_selection,
        goals_of_a_team,
        goals_difference,
      };
      const {data} = await footballApi.post('/tournament/create',body);
      closeModal();
      startLoadTournaments();
      // navigate('/');
      Swal.fire({
        title: "Registro Exitoso",
        text: data.message,
        icon: "success",
      })
    } catch (error) {
      console.log(error);
    }
  }

  const startUpdateTournament = async ({id,name, description, exact_marker, goals_difference, winner_selection, goals_of_a_team }) => {

    try {
      const body ={
        name,
        description,
        exact_marker,
        winner_selection,
        goals_of_a_team,
        goals_difference,
      };
      const {data} = await footballApi.put('/tournament/'+id,body);
      closeModal();
      dispatch(onUpdateTournament({id,name, description, exact_marker, goals_difference, winner_selection, goals_of_a_team }))
      Swal.fire({
        title: "Actualización Exitosa",
        text: data.message,
        icon: "success",
      })
    } catch (error) {
      console.log(error);
    }
  }

  const startDeleteTournament = async ({id}) => {

    try {

      const {data} = await footballApi.delete('/tournament/'+id);
      dispatch(onDeleteTournament({id}))
      navigate('/');
      Swal.fire({
        title: "Eliminación Exitosa",
        text: data.message,
        icon: "success",
      })
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // *Propiedades
    tournaments,
    // *Metodos
    startLoadTournaments,
    startCreateTournament,
    startUpdateTournament,
    startDeleteTournament,
  }
}
