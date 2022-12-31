import { Directions } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import imgLogin from '../../assets/img/login.jpg'
import { AuthLayout } from "../layout/AuthLayout"

export const LoginPage = () => {
  return (
      <AuthLayout title={'Pronosticos de partidos'} imageSrc={imgLogin} heightBox={420}>
        <form >
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
                value=""
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
                value=""
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
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}

            >
              <Button 
                      fullWidth
                      variant="contained">
                        Google
              </Button>
            </Grid>
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
