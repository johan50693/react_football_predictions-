import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, useMatchStore } from "../../../hooks";
import { useUiStore } from "../../../hooks/useUiStore";

let formData = {
  league: '',
  team_a: '',
  team_b: '',
  goals_a: '',
  goals_b: '',
  penalties_a: '',
  penalties_b: '',
  date: ''
};


const formValidations = {
  league : [(value) => value.length > 3, 'El nombre de la liga debe tener mas de 3 letras'],
  team_a : [(value) => value.length >= 3,'El nombre del equipo debe tener mas de 3 letras'],
  team_b : [(value) => value.length >= 3,'El nombre del equipo debe tener mas de 3 letras'],
  goals_a : [(value) => value >= 0,'Los puntajes deben ser mayores o iguales a 0'],
  goals_b : [(value) => value >= 0,'Los puntajes deben ser mayores o iguales a 0'],
  penalties_a : [(value) => value >= 0,'Los puntajes deben ser mayores o iguales a 0'],
  penalties_b : [(value) => value >= 0,'Los puntajes deben ser mayores o iguales a 0'],
  date : [(value) => value.length,'La fecha no puede estar vacia'],
}

export const FormMatch = () => {

  const { openModal, closeModal, open } = useUiStore();
  const [formSubmited, setformSubmited] = useState(false);
  const { active } = useSelector(state => state.match);
  const { startUpdateMatch, startCreateMatch } = useMatchStore();
  const {
    league,
    team_a,
    team_b,
    goals_a,
    goals_b,
    penalties_a,
    penalties_b,
    date,
    leagueValid,
    team_aValid,
    team_bValid,
    goals_aValid,
    goals_bValid,
    penalties_aValid,
    penalties_bValid,
    dateValid,
    isFormValid,
    setFormState,
    onInputChange,
  } = useForm(formData,formValidations)

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmited(true);
    if(!isFormValid) return;

    if ( active ) {
      startUpdateMatch({id: active.id,league,team_a,team_b,goals_a,goals_b,penalties_a,penalties_b,date});
    }else{
      startCreateMatch({league,team_a,team_b,goals_a,goals_b,penalties_a,penalties_b,date});
    }

  }

  useEffect(() => {
    if ( active ) {
      setFormState(active);
    }
  }, [])
  
  return (
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
                label="Torneo"
                type="text"
                placeholder="Ingresa el nombre del torneo"
                name="league"
                value={league}
                onChange={onInputChange}
                error={!!leagueValid && formSubmited}
                helperText={leagueValid}
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
                label="Nombre del equipo A"
                type="text"
                placeholder="Ingresa el nombre del equipo A"
                name="team_a"
                value={team_a}
                onChange={onInputChange}
                error={!!team_aValid && formSubmited}
                helperText={team_aValid}
              />
            </Grid>
            <Grid container
                  spacing={2}
                  justifyContent= 'space-between' >
              <Grid
                  item
                  xs={6}
                  sx={{mt:2}}
            >
              <TextField
                fullWidth
                autoComplete="off"
                label="Goles del equipo A"
                type="number"
                placeholder="Ingresa los goles"
                name="goals_a"
                value={goals_a}
                onChange={onInputChange}
                error={!!goals_aValid && formSubmited}
                helperText={goals_aValid}
              />
            </Grid>
              <Grid
                    item
                    xs={6}
                    sx={{mt:2}}
              >
                <TextField
                  fullWidth
                  autoComplete="off"
                  label="Penalties Equipo A"
                  type="number"
                  placeholder="Ingresa los goles"
                  name="penalties_a"
                  value={penalties_a}
                  onChange={onInputChange}
                  error={!!penalties_aValid && formSubmited}
                  helperText={penalties_aValid}
                />
              </Grid>
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
                label="Nombre del equipo B"
                type="text"
                placeholder="Ingresa el nombre del equipo B"
                name="team_b"
                value={team_b}
                onChange={onInputChange}
                error={!!team_bValid && formSubmited}
                helperText={team_bValid}
              />
            </Grid>

            <Grid container
                  spacing={2}
                  justifyContent= 'space-between' >
              
              <Grid
                    item
                    xs={6}
                    sx={{mt:2}}
              >
                <TextField
                  fullWidth
                  autoComplete="off"
                  label="Goles del equipo B"
                  type="number"
                  placeholder="Ingresa los goles"
                  name="goals_b"
                  value={goals_b}
                  onChange={onInputChange}
                  error={!!goals_bValid && formSubmited}
                  helperText={goals_bValid}
                />
              </Grid>
              <Grid
                    item
                    xs={6}
                    sx={{mt:2}}
              >
                <TextField
                  fullWidth
                  autoComplete="off"
                  label="Penalties equipo B"
                  type="number"
                  placeholder="Ingresa los goles"
                  name="penalties_b"
                  value={penalties_b}
                  onChange={onInputChange}
                  error={!!penalties_bValid && formSubmited}
                  helperText={penalties_bValid}
                />
              </Grid>
            
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
                label="Fecha del partido"
                type="date"
                name="date"
                value={date}
                onChange={onInputChange}
                error={!!dateValid && formSubmited}
                helperText={dateValid}
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
              <Button onClick={closeModal}
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
  )
}
