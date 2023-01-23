

import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsIcon from '@mui/icons-material/Groups'
import { Link as RouterLink} from 'react-router-dom'
import { useSelector } from 'react-redux';

export const openedMixin = (theme,drawerWidth) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme,drawerWidth) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const SideBarStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth' })(
  ({ theme, open, drawerWidth}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme,drawerWidth),
      '& .MuiDrawer-paper': openedMixin(theme,drawerWidth),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme,drawerWidth),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const SideBar = ({ open, drawerWidth, handleDrawerClose }) => {

  const theme = useTheme();
  const { active } = useSelector(state => state.tournament);
  return (

    <SideBarStyled variant="permanent" open={open} drawerWidth={drawerWidth}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Torneos', 'Pronosticos', 'Partidos', 'Participantes'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {
                    (index === 0 )
                    ? <Link component={RouterLink} to='/' underline="none"><EmojiEventsIcon /></Link> 
                    : ( index === 1) 
                      ? <Link component={RouterLink} to={`/tournament/${active?.id}/prediction`} underline="none"><QueryStatsIcon/> </Link>
                      : ( index === 2 )
                        ? <Link component={RouterLink} to={`/tournament/${active?.id}/matches`} underline="none"><SportsSoccerIcon/></Link>
                        : <Link component={RouterLink} to={`/tournament/${active?.id}/participants`} underline="none"><GroupsIcon/></Link>
                  }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SideBarStyled>
  )
}