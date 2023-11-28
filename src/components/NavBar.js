// components/HomePage.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../helpers/auth/AuthProvider';
import { Link } from 'react-router-dom';
import { useMenu } from '../helpers/menu/MenuProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AssignmentTurnedIn, Cached, Map, ConfirmationNumber, Archive, Style, Dashboard, MonetizationOn, HomeWork } from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const NavBar = () => {
  const theme = useTheme();
  const auth = useAuth();
  const { selectedMenu } = useMenu();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = async () => {
    auth.logout();
  };

  const menuItems1 = [
    { icon: <Dashboard />, text: 'Dashboard', to: '/' },
    // add item for zones
    { icon: <AssignmentTurnedIn />, text: 'Packing Zones', to: '/zones-list' },
    // add item for warehouses
    { icon: <HomeWork />, text: 'Warehouses', to: '/warehouse-list' },
    // add item for reworks
    { icon: <Cached />, text: 'Reworks', to: '/rework-list' },
    // add item for sales
    { icon: <MonetizationOn />, text: 'Sales', to: '/sales-list' },
  ];

  const menuItems2 = [
    // add item for styles
    { icon: <Style />, text: 'Styles', to: '/styles-list' },
    // add item for lots
    { icon: <ConfirmationNumber />, text: 'Lots', to: '/lots-list' },
    // add item for regions
    { icon: <Archive />, text: 'Batch', to: '/batch-list' },
    // add item for regions
    { icon: <Map />, text: 'Regions', to: '/regions-list' },
  ];

  const iconStyles = {
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
  };

  const textStyles = {
    fontSize: '18px',
    opacity: open ? 1 : 0,
  };


  const linkStyle = {
    textDecoration: "none",
    color: 'black'
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color='success' position="fixed" open={open} sx={{ height: 70, display: 'flex', justifyContent: 'center' }}>
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
          <div>
            <img src="./logo.png" alt="Farmica" width={50} height={50} />
          </div>
          <Typography variant="h6" noWrap component="div">
            Farmica Management System
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  window.location.href = '/profile';
                }}
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <AccountCircleIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={logout}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        sx={{
          marginRight: isMobile ? 0 : 3,
          display: isMobile && !open ? 'none' : 'block',
        }}
        open={open}>
        <DrawerHeader sx={{ height: 70 }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems1.map((item, index) => (
            <ListItem key={item.text} sx={{ display: 'block' }}>
              <Link to={item.to}
                style={linkStyle}
                color="inherit">
                <ListItemButton sx={{ justifyContent: open ? 'initial' : 'center' }}>
                  <ListItemIcon sx={iconStyles}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{
                    ...textStyles,
                    fontWeight: item.to === selectedMenu ? 'bold' : 'normal',
                  }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems2.map((item, index) => (
            <ListItem key={item.text} sx={{ display: 'block' }}>
              <Link to={item.to}
                style={linkStyle}
                color="inherit">
                <ListItemButton sx={{ justifyContent: open ? 'initial' : 'center' }}>
                  <ListItemIcon sx={iconStyles}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{
                    ...textStyles,
                    fontWeight: item.to === selectedMenu ? 'bold' : 'normal',
                  }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer >
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
      </Box>
    </Box >
  );
};

export default NavBar;
