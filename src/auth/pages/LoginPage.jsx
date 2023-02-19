import { Directions } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Link as RouterLink } from 'react-router-dom'
import imgLogin from '../../assets/img/login.jpg'
import { useAuthStore, useForm } from "../../hooks"
import { AuthLayout } from "../layout/AuthLayout"

const FormData = {
  email: '',
  password: '',
};

export const LoginPage = () => {

  const [formSubmited, setFormSubmited] = useState(false);
  const { startLogin } = useAuthStore();

  const {
          email, 
          password, 
          onInputChange,
          isFormValid,
        } = useForm(FormData);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if(!isFormValid) return;
    startLogin({email,password});
  }

  return (
      <AuthLayout title={'Pronosticos de partidos'} imageSrc={imgLogin} heightBox={420}>
        <form onSubmit={onSubmit}>
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
                label="Correo"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                value={email}
                onChange={onInputChange}
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
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={password}
                onChange={onInputChange}
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
                        Iniciar Sesión
              </Button>
            </Grid>
            {/* <Grid
                  item
                  xs={12}
                  sx={{mt:2}}

            >
              <Button 
                      fullWidth
                      variant="contained">
                        Google
              </Button>
            </Grid> */}
            <Grid
                  container
                  justifyContent='end'
                  direction='row'
                  sx={{mt:2}}

            >
              <Typography sx={{ mr: 1}}>¿No tienes cuenta? </Typography>
              <Link component={RouterLink} underline="hover" color="inherit" to='/auth/register'>
                Crear Cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
  )
}
