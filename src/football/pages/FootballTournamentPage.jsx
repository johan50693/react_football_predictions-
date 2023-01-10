import { Button, Grid, Link, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BaseLayout } from "../layout/BaseLayout";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { useState } from "react";

const formData = {
  name: '',
  description: '',
  exactMarker: '',
  selectWinner: '',
  goalsOfaTeam: '',
  goalDifference: '',
};

const formValidations = {
  name : [(value) => value.length > 3, 'El nombre debe tener mas de 3 letras'],
  description : [(value) => value.length >= 3,'La descripción  debe tener mas de 3 letras'],
  exactMarker : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
  selectWinner : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
  goalsOfaTeam : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
  goalDifference : [(value) => value > 0,'Los puntajes deben ser mayores a 0'],
}

export const FootballTournamentPage = () => {

  const [formSubmited, setformSubmited] = useState(false);
  const {
          onInputChange, 
          name, 
          description, 
          exactMarker, 
          goalDifference, 
          selectWinner, 
          goalsOfaTeam, 
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
  }

  return (
    <BaseLayout>
      <h1>Crear Torneo</h1>

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
                name="exactMarker"
                value={exactMarker}
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
                name="selectWinner"
                value={selectWinner}
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
                name="goalsOfaTeam"
                value={goalsOfaTeam}
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
                name="goalDifference"
                value={goalDifference}
                onChange={onInputChange}
                error={!!goalDifferenceValid && formSubmited}
                helperText={goalDifferenceValid}
              />
            </Grid>
            <Grid
                  item
                  xs={12}
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
        </form>
    </BaseLayout>
  )
}
