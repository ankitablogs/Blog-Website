import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: '0 auto',
  width: '100%',
  maxWidth: '600px',
  borderRadius: '20px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: theme.typography.pxToRem(14), // Reduced base font size for input
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(16), // Normal size for larger screens
    },
  },
}));

export default function PrimarySearchAppBar({ searchTerm, setSearchTerm }) {
  const [mobileActionsAnchorEl, setMobileActionsAnchorEl] = React.useState(null);
  const isMobileActionsOpen = Boolean(mobileActionsAnchorEl);

  const handleMobileActionsOpen = (event) => {
    setMobileActionsAnchorEl(event.currentTarget);
  };

  const handleMobileActionsClose = () => {
    setMobileActionsAnchorEl(null);
  };

  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/admin/login');
    handleMobileActionsClose();
  };

  const moveToEditPage = () => {
    navigate('/admin/home');
    handleMobileActionsClose();
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}user/logout`);
      localStorage.removeItem('token');
      navigate('/');
      handleMobileActionsClose();
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = localStorage.getItem('token');

  const renderMobileActionsMenu = (
    <Menu
      anchorEl={mobileActionsAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="mobile-actions-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileActionsOpen}
      onClose={handleMobileActionsClose}
    >
      {isLoggedIn && (
        <MenuItem onClick={moveToEditPage}>
          Edit
        </MenuItem>
      )}
      {isLoggedIn ? (
        <MenuItem onClick={logoutUser}>
          Logout
        </MenuItem>
      ) : (
        <MenuItem onClick={moveToLogin}>
          Admin Login
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ae6cff' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Brand name - with responsive font size */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: 'block',
              wordSpacing: '5px',
              minWidth: { xs: '90px', sm: '120px' },
              flexShrink: 0,
              fontSize: { xs: '1rem', sm: '1.25rem' } // Responsive font sizing
            }}
          >
            HER ALCHEMY
          </Typography>

          {/* Centered search bar */}
          <Box sx={{ 
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            px: { xs: 1, sm: 2 }, // Smaller padding on mobile
            maxWidth: 'md'
          }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </Search>
          </Box>

          {/* Right-aligned actions */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            gap: 2,
            alignItems: 'center',
            minWidth: '120px',
            justifyContent: 'flex-end'
          }}>
            {isLoggedIn && (
              <Button 
                variant="outlined" 
                onClick={moveToEditPage} 
                sx={{ 
                  borderRadius: '20px', 
                  color: 'white', 
                  borderColor: 'white',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' } // Responsive button text
                }}
              >
                Edit
              </Button>
            )}
            {isLoggedIn ? (
              <Button 
                variant="outlined" 
                onClick={logoutUser} 
                sx={{ 
                  borderRadius: '20px', 
                  color: 'white', 
                  borderColor: 'white',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' } // Responsive button text
                }}
              >
                Logout
              </Button>
            ) : (
              <Button 
                variant="outlined" 
                onClick={moveToLogin} 
                sx={{ 
                  borderRadius: '20px', 
                  color: 'white', 
                  borderColor: 'white',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' } // Responsive button text
                }}
              >
                Admin
              </Button>
            )}
          </Box>

          {/* Mobile actions menu (three dots) */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' },
            minWidth: '40px'
          }}>
            <IconButton
              size="large"
              aria-label="show actions"
              color="inherit"
              onClick={handleMobileActionsOpen}
              sx={{
                padding: { xs: '8px', sm: '12px' } // Smaller padding on mobile
              }}
            >
              <MoreIcon fontSize="small" /> {/* Smaller icon on mobile */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile actions menu */}
      {renderMobileActionsMenu}
    </Box>
  );
}