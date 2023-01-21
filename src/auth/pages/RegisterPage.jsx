import { AuthLayout } from "../layout/AuthLayout"
import imgRegister from '../../assets/img/register.jpg'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink} from 'react-router-dom'
import { useAuthStore, useForm } from "../../hooks";
import { useState } from "react";


const FormData = {
  name: '',
  email: '',
  password: '',
};

const formValidations = {
  name : [(value) => value.length > 3, 'El nombre debe tener mas de 3 letras'],
  email : [(value) => /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(value),'El correo suministrado no se considera válido'],
  password : [(value) => value.length >= 5,'La contraseña debe contener minimo 5 carácteres'],
}

export const RegisterPage = () => {

  const [formSubmited, setFormSubmited] = useState(false);
  const {startRegister} = useAuthStore();

  const { name, 
          email, 
          password, 
          nameValid, 
          emailValid, 
          passwordValid, 
          onInputChange,
          isFormValid,
        } = useForm(FormData,formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if(!isFormValid) return;
    startRegister({name,email,password});
  }

  return ( 
    <AuthLayout title={'Registro'} imageSrc={imgRegister} heightBox={ isFormValid ? 450: 470}>
      <form onSubmit={onSubmit}>
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
                value={name}
                onChange={onInputChange}
                error={!!nameValid && formSubmited}
                helperText={(!!nameValid && formSubmited) ? nameValid : null}
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
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmited}
                helperText={(!!emailValid && formSubmited) ? emailValid : null}
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
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmited}
                helperText={(!!passwordValid && formSubmited) ? passwordValid : null}
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
