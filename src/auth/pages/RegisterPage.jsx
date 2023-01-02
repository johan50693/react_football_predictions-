import { AuthLayout } from "../layout/AuthLayout"
import imgRegister from '../../assets/img/register.jpg'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink} from 'react-router-dom'

export const RegisterPage = () => {
  return (
    <AuthLayout title={'Registro'} imageSrc={imgRegister} heightBox={450}>
      <form >
          <Grid container> 
            <Grid
                  item
                  xs={12}
                  sx={{mt:2}}
            >
              <TextField
                required
                autoComplete="off"
                fullWidth
                label="Nombre"
                type="text"
                placeholder="Ingresa su nombre completo"
                name="name"
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
                autoComplete="off"
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
                        Registrar
              </Button>
            </Grid>
            <Grid
                  container
                  justifyContent='end'
                  direction='row'
                  sx={{mt:2}}

            >
              <Typography sx={{ mr: 1}}>¿No tienes cuenta? </Typography>
              <Link component={RouterLink} underline="hover" color="inherit" to='/auth/login'>
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
