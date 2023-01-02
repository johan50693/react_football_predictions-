import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SideBar, NavBar } from "../components";

const drawerWidth = 240;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
    
export const BaseLayout = ({children}) => {

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar drawerWidth={drawerWidth} open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar  open={open} drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <DrawerHeader />
          {children}        
      </Box>
    </Box>
  )
}
