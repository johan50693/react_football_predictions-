import { Button, Grid, Link, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BaseLayout } from "../layout/BaseLayout";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink, useNavigate, useNavigation, useParams } from "react-router-dom";
import { useForm } from "../../hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTournamentsStore } from "../../hooks/useTournamentsStore";

let formData = {
  name: '',
  description: '',
  exact_marker: '',
  winner_selection: '',
  goals_of_a_team: '',
  goals_difference: '',
};

const formValidations = {
  name : [(value) => value.length > 3, 'El nombre debe tener mas de 3 letras'],
  description : [(value) => value.length >= 3,'La descripción  debe tener mas de 3 letras'],
  exact_marker : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
  winner_selection : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
  goals_of_a_team : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
  goals_difference : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
}

export const FootballTournamentPage = () => {

  const { active } = useSelector(state => state.tournament);
  const { id } = useParams();
  const { startCreateTournament, startUpdateTournament } = useTournamentsStore();
  const navigate = useNavigate();
  const [formSubmited, setformSubmited] = useState(false);
  const {
          onInputChange, 
          onResetForm,
          setFormState,
          name, 
          description, 
          exact_marker, 
          goals_difference, 
          winner_selection, 
          goals_of_a_team, 
          formState,
          nameValid,
          descriptionValid,
          exactMarkerValid,
          goalDifferenceValid,
          selectWinnerValid,
          goalsOfaTeamValid,
          isFormValid
        } = useForm(formData,formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmited(true);
    if(!isFormValid) return;

    if (id != undefined) {
      startUpdateTournament({id,name, description, exact_marker, goals_difference, winner_selection, goals_of_a_team });
    }else{
      startCreateTournament({name, description, exact_marker, goals_difference, winner_selection, goals_of_a_team });
    }
  }

  useEffect(() => {
    if (id != undefined) {
      setFormState(active);
    }
  }, [])
  
  return (
    <BaseLayout>
      <h1>{ (id == undefined ) ? 'Crear Torneo' : 'Actualizar Torneo'}</h1>

      <form onSubmit={onSubmit} >
          <Grid container> 
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}
            >
              <TextField
                required
                fullWidth
                autoComplete="off"
                label="Nombre"
                type="text"
                placeholder="Ingresa el nombre del torneo"
                name="name"
                value={name}
                onChange={onInputChange}
                error={!!nameValid && formSubmited}
                helperText={nameValid}
              />
            </Grid>
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}
            >
              <TextField
                fullWidth
                autoComplete="off"
                label="Descripción"
                type="text"
                placeholder="Ingresa una descripción para el torneo"
                name="description"
                value={description}
                onChange={onInputChange}
                error={!!descriptionValid && formSubmited}
                helperText={descriptionValid}
              />
            </Grid>
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}
            >
              <TextField
                required
                fullWidth
                autoComplete="off"
                label="Marcador Exacto"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta el marcador es exacto"
                name="exact_marker"
                value={exact_marker}
                onChange={onInputChange}
                error={!!exactMarkerValid && formSubmited}
                helperText={exactMarkerValid}
              />
            </Grid>
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}
            >
              <TextField
                required
                autoComplete="off"
                fullWidth
                label="Selección del ganador"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta el ganador"
                name="winner_selection"
                value={winner_selection}
                onChange={onInputChange}
                error={!!selectWinnerValid && formSubmited}
                helperText={selectWinnerValid}
              />
            </Grid>
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}
            >
              <TextField
                required
                fullWidth
                autoComplete="off"
                label="Goles de un equipo"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta los goles de un equipo"
                name="goals_of_a_team"
                value={goals_of_a_team}
                onChange={onInputChange}
                error={!!goalsOfaTeamValid && formSubmited}
                helperText={goalsOfaTeamValid}
              />
            </Grid>
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}
            >
              <TextField
                required
                fullWidth
                autoComplete="off"
                label="Diferencia de goles"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta la diferencia de goles"
                name="goals_difference"
                value={goals_difference}
                onChange={onInputChange}
                error={!!goalDifferenceValid && formSubmited}
                helperText={goalDifferenceValid}
              />
            </Grid>
            <Grid container 
                  spacing={2} 
                  justifyContent='center'
                  alignItems='center'
                  directions= "column">
              <Grid
                  item
                  xs={5}
                  md={5}
                  sx={{mt:2}}

            >
              <Button onClick={() => navigate(-1)}
                      fullWidth
                      color="error"
                      type="button"
                      variant="contained">
                        Cancelar
              </Button>
            </Grid>
              <Grid
                  item
                  xs={5}
                  md={5}
                  sx={{mt:2}}

            >
              <Button 
                      fullWidth
                      type="submit"
                      variant="contained">
                        Guardar
              </Button>
            </Grid>
            </Grid>
          </Grid>
        </form>
    </BaseLayout>
  )
}
