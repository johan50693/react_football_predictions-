import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAnswerStore, useForm, useMatchStore } from "../../../hooks";
import { useUiStore } from "../../../hooks/useUiStore";

let formData = {
  goals_a: '',
  goals_b: '',
  penalties_a: '',
  penalties_b: '',
};


const formValidations = {
  goals_a : [(value) => value >= 0,'Los puntajes deben ser mayores o iguales a 0'],
  goals_b : [(value) => value >= 0,'Los puntajes deben ser mayores o iguales a 0'],
}

export const FormAnswer = () => {

  const { openModal, closeModal, open } = useUiStore();
  const [formSubmited, setformSubmited] = useState(false);
  const { active } = useSelector(state => state.answer);
  const { startUpdateAnswer } = useAnswerStore();
  const {
    goals_a,
    goals_b,
    penalties_a,
    penalties_b,
    goals_aValid,
    goals_bValid,
    penalties_aValid,
    penalties_bValid,
    isFormValid,
    setFormState,
    onInputChange,
  } = useForm(formData,formValidations)

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmited(true);
    if(!isFormValid) return;
    if ( active ) {
      let date = new Date().toISOString().split('T')[0]
      startUpdateAnswer({id: active.id,poll_id: active.poll_id,goals_a,goals_b,penalties_a,penalties_b,date});
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
                      disabled={formSubmited}
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
