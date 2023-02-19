
import { Button, styled, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from '../../hooks';

export const NavBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})(({ theme, open, drawerWidth}) => (
  {
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export const NavBar = ({drawerWidth, open, handleDrawerOpen}) => {

  const {user} = useSelector(state => state.auth);
  const {startLogout} = useAuthStore();

  const onLogout = () => {
    startLogout();
  }

  return  (
      <NavBarStyled position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Pronosticos de Fútbol
          </Typography>
          <Typography variant="h6" noWrap component="div">
          {user.name}
          </Typography>
          <Button color="inherit">
            <LogoutIcon onClick={onLogout} />
          </Button>
        </Toolbar>
      </NavBarStyled>
    )
}