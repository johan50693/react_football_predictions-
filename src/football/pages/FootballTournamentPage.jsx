import { Button, Grid, Link, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BaseLayout } from "../layout/BaseLayout";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from "react-router-dom";

export const FootballTournamentPage = () => {

  const columns = [
    //TODO: Definir renderCell para agregar inpusts dinamicos a los campos de goles
    { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth: 100 },
    { field: 'puntos', headerName: 'Puntos', flex: 1, minWidth: 50 },
  ];
  
  const rows = [
    { id: 1, nombre: 'Barcelona', puntos: 10 },
    { id: 2, nombre: 'Real Madrid', puntos: 9 },
    { id: 3, nombre: 'Manchester Utd', puntos: 8 },
    { id: 4, nombre: 'PSG', puntos: 7 },
    { id: 5, nombre: 'Liverpool', puntos: 6 },
    { id: 6, nombre: 'Villarreal', puntos: 5 },
    { id: 7, nombre: 'Tottenham', puntos: 4 },
    { id: 8, nombre: 'Chelsea', puntos: 3 },
    { id: 9, nombre: 'Arsenal', puntos: 2 },
  ];

  return (
    <BaseLayout>
      <h1>Crear Torneo</h1>

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
                label="Nombre"
                type="text"
                placeholder="Ingresa el nombre del torneo"
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
                fullWidth
                autoComplete="off"
                label="Descripción"
                type="text"
                placeholder="Ingresa una descripción para el torneo"
                name="description"
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
                label="Marcador Exacto"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta el marcador es exacto"
                name="exactMarker"
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
                autoComplete="off"
                fullWidth
                label="Selección del ganador"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta el ganador"
                name="password"
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
                label="Goles de un equipo"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta los goles de un equipo"
                name="password"
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
                label="Diferencia de goles"
                type="number"
                placeholder="Ingresa los puntos ganados cuando se acierta la diferencia de goles"
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
                        Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
    </BaseLayout>
  )
}
