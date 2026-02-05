import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from "react-router";
import useAuth from '../store/authStore.js';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        [theme.breakpoints.up('sm')]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
        },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const menuItems = [
  { text: 'Home', path: '/app/dashboard', icon: <DashboardIcon />, allowedRoles: ['Admin', 'Store-manager'] },
  { text: 'Products', path: '/app/products', icon: <InventoryIcon /> , allowedRoles: ['Admin', 'Store-manager', 'Employee']},
  { text: 'Users', path: '/app/users', icon: <PeopleIcon />, allowedRoles: ['Admin'] },
];
  
export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const { logout, user, authLoading } = useAuth();

  const drawerContent = (
    <>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => {
          if (!item.allowedRoles.includes(user.role)) return null;
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    borderRight: isActive ? '4px solid #1976d2' : 'none',
                    boxSizing: 'border-box',
                    '&:hover': {
                      backgroundColor: isActive ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                    },
                  },
                  // Only apply centering logic if it's the desktop mini-drawer
                  !isMobile && !open ? { justifyContent: 'center' } : { justifyContent: 'initial' },
                ]}
                component={Link}
                to={item.path}
                onClick={isMobile ? handleDrawerClose : null}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    // Only apply margin logic if it's the desktop mini-drawer
                    !isMobile && open ? { mr: 3 } : { mr: isMobile ? 3 : 'auto' },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    // Hide text only in the desktop "closed" mini-state
                    !isMobile && !open ? { opacity: 0 } : { opacity: 1 }
                  ]}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex', mb: 10 }}>
      <CssBaseline />
      <AppBar position="fixed" open={!isMobile && open} sx={{ backgroundColor: "#F9FAFB", boxShadow: 1 }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                { marginRight: { xs: 2, sm: 5 }, },
                // Keep the menu icon visible on mobile even when open so user can toggle
                (!isMobile && open) && { display: 'none' }, 
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="h1" className="title" sx={{ fontFamily: 'Playwrite GB J Guides, cursive', fontWeight: '500', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              StockTrack
            </Typography>
          </Box>
          <Button 
            loading={authLoading} 
            onClick={logout} 
            variant="outlined" 
            size={isMobile ? "small" : "medium"}
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER: Only renders when screen is small */}
      {isMobile ? (
        <MuiDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#F9FAFB" },
          }}
        >
          {drawerContent}
        </MuiDrawer>
      ) : (
        /* DESKTOP DRAWER: Only renders when screen is medium or larger */
        <Drawer
          variant="permanent"
          open={open}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3 }, 
        width: "100%", // Box will naturally fill available space in the flex container
        overflowX: 'hidden'
      }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}