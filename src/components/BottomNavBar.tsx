import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  LocalShipping as LocalShippingIcon,
  PhotoLibrary as PhotoLibraryIcon,
  ContactSupport as ContactSupportIcon,
  RequestQuote as RequestQuoteIcon
} from '@mui/icons-material';

const RED_COLOR = '#DE1F27';

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [value, setValue] = useState(0);
  
  // Map paths to navigation indices
  const pathToIndex: Record<string, number> = {
    '/': 0,
    '/services': 1,
    '/quote/service': 2,
    '/quote/location': 2,
    '/quote/details': 2,
    '/quote/review': 2,
    '/instant-quote': 2,
    '/gallery': 3,
    '/contact-us': 4
  };
  
  // Update the value when the location changes
  useEffect(() => {
    const index = pathToIndex[location.pathname];
    if (index !== undefined) {
      setValue(index);
    }
  }, [location]);
  
  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    const paths = ['/', '/services', '/quote/service', '/gallery', '/contact-us'];
    navigate(paths[newValue]);
    window.scrollTo(0, 0);
  };
  
  if (!isMobile) return null;
  
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0px',
        bgcolor: '#0A0A0A'
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => handleNavigation(newValue)}
        showLabels
        sx={{
          bgcolor: '#0A0A0A',
          '& .MuiBottomNavigationAction-root': {
            color: 'rgba(255,255,255,0.7)',
            minWidth: 0,
            maxWidth: '100%',
            padding: '6px 0',
            fontSize: '0.75rem'
          },
          '& .Mui-selected': {
            color: RED_COLOR
          }
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Services"
          icon={<LocalShippingIcon />}
        />
        <BottomNavigationAction
          label="Quote"
          icon={<RequestQuoteIcon />}
        />
        <BottomNavigationAction
          label="Gallery"
          icon={<PhotoLibraryIcon />}
        />
        <BottomNavigationAction
          label="Contact"
          icon={<ContactSupportIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar; 