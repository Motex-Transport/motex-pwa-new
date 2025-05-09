import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  TextField,
  IconButton,
  InputAdornment,
  Divider,
  SwipeableDrawer,
  Alert,
  Snackbar,
  Fab,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Slide,
  Fade
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlaceIcon from '@mui/icons-material/Place';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import OSMMap, { LocationData } from '../../components/Map/OSMMap';

const LocationSelectionPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const locationState = useLocation().state || {};
  
  // Initialize with previous data if available
  const { selectedService } = locationState;
  
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [pickupLocation, setPickupLocation] = useState<LocationData | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<LocationData | null>(null);
  const [selectingPickup, setSelectingPickup] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [drawerHeight, setDrawerHeight] = useState<'partial' | 'full'>(isMobile ? 'partial' : 'full');
  const [isLoading, setIsLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  
  // Enable animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle geolocation for current position
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSearchError('Geolocation is not supported by your browser');
      return;
    }
    
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocode to get address
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          
          if (!response.ok) {
            throw new Error('Failed to get address for current location');
          }
          
          const data = await response.json();
          const address = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          
          const locationData: LocationData = {
            address,
            latLng: [latitude, longitude]
          };
          
          if (selectingPickup) {
            setPickupLocation(locationData);
            setPickupAddress(address);
          } else {
            setDropoffLocation(locationData);
            setDropoffAddress(address);
          }
          
        } catch (error) {
          console.error('Error getting current location:', error);
          
          // Still update with raw coordinates
          const locationData: LocationData = {
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            latLng: [latitude, longitude]
          };
          
          if (selectingPickup) {
            setPickupLocation(locationData);
            setPickupAddress(locationData.address);
          } else {
            setDropoffLocation(locationData);
            setDropoffAddress(locationData.address);
          }
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        setSearchError('Unable to retrieve your location. Please make sure location services are enabled.');
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  // Function to search for an address using the OSM Nominatim API
  const searchAddress = async (address: string, isPickup: boolean) => {
    if (!address.trim()) {
      setSearchError('Please enter an address to search');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      
      if (!response.ok) {
        throw new Error('Address search failed');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const locationData: LocationData = {
          address: result.display_name,
          latLng: [parseFloat(result.lat), parseFloat(result.lon)]
        };
        
        if (isPickup) {
          setPickupLocation(locationData);
          setPickupAddress(locationData.address);
        } else {
          setDropoffLocation(locationData);
          setDropoffAddress(locationData.address);
        }
        
        setSearchError(null);
        
        // Don't close drawer in mobile view after selecting locations
        // This ensures the drawer remains visible after selecting dropoff location
      } else {
        setSearchError(`No results found for "${address}". Try a different search term.`);
      }
    } catch (error) {
      console.error('Error searching for address:', error);
      setSearchError('Error searching for address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Swap pickup and dropoff locations
  const handleSwapLocations = () => {
    if (pickupLocation && dropoffLocation) {
      const tempLocation = pickupLocation;
      const tempAddress = pickupAddress;
      
      setPickupLocation(dropoffLocation);
      setPickupAddress(dropoffAddress);
      
      setDropoffLocation(tempLocation);
      setDropoffAddress(tempAddress);
    }
  };
  
  // Update text field when map location changes
  const handlePickupLocationChange = (location: LocationData) => {
    setPickupLocation(location);
    setPickupAddress(location.address);
  };
  
  const handleDropoffLocationChange = (location: LocationData) => {
    setDropoffLocation(location);
    setDropoffAddress(location.address);
  };
  
  const handlePickupSearch = () => {
    searchAddress(pickupAddress, true);
  };
  
  const handleDropoffSearch = () => {
    searchAddress(dropoffAddress, false);
  };
  
  const handleBack = () => {
    navigate('/quote/service', { state: { selectedService } });
  };
  
  const handleNext = () => {
    if (pickupLocation && dropoffLocation) {
      // Calculate distance and estimated duration
      const calculateDistance = (): { distance: string; duration: string } => {
        // Very basic calculation, would need a proper routing engine in production
        if (!pickupLocation || !dropoffLocation) {
          return { distance: 'Unknown', duration: 'Unknown' };
        }
        
        // Convert LatLngExpression to tuple of numbers for calculation
        const getCoordinates = (loc: LocationData): [number, number] => {
          if (Array.isArray(loc.latLng)) {
            return [Number(loc.latLng[0]), Number(loc.latLng[1])];
          } else if (typeof loc.latLng === 'object' && 'lat' in loc.latLng && 'lng' in loc.latLng) {
            return [Number(loc.latLng.lat), Number(loc.latLng.lng)];
          }
          // Default fallback
          return [0, 0];
        };
        
        const [lat1, lon1] = getCoordinates(pickupLocation);
        const [lat2, lon2] = getCoordinates(dropoffLocation);
        
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        // Estimate duration (very rough estimate)
        const averageSpeed = 40; // km/h
        const estimatedMinutes = Math.round((distance / averageSpeed) * 60);
        
        return {
          distance: `${distance.toFixed(1)} km`,
          duration: `${estimatedMinutes} minutes`
        };
      };
      
      const { distance, duration } = calculateDistance();
      
      navigate('/quote/details', { 
        state: { 
          selectedService,
          pickupLocation: pickupAddress,
          dropoffLocation: dropoffAddress,
          pickupCoordinates: pickupLocation.latLng,
          dropoffCoordinates: dropoffLocation.latLng,
          distance,
          duration
        } 
      });
    }
  };
  
  const toggleDrawerHeight = () => {
    setDrawerHeight(drawerHeight === 'partial' ? 'full' : 'partial');
  };
  
  // Determine drawer height based on state and screen size
  const getDrawerHeight = () => {
    if (!isMobile) return '50%';
    return drawerHeight === 'partial' ? '45%' : '75%';
  };

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        width: '100%', 
        position: 'relative',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default
      }}
    >
      {/* Back button (shown on all screens but styled differently) */}
      <Fade in={animateIn}>
        <Box 
          sx={{ 
            position: 'absolute', 
            top: isMobile ? 16 : 20, 
            left: isMobile ? 16 : 20, 
            zIndex: 1100 
          }}
        >
          <IconButton 
            onClick={handleBack}
            sx={{ 
              bgcolor: 'white', 
              boxShadow: 2,
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48,
              '&:hover': { bgcolor: 'white', opacity: 0.9 }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
      </Fade>
      
      {/* Header with step indicator (desktop version) */}
      {!isMobile && (
        <Fade in={animateIn}>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 20, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              zIndex: 1100,
              width: 'auto',
              bgcolor: 'rgba(255,255,255,0.9)',
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: 2
            }}
          >
            <Stepper activeStep={1} sx={{ width: 400 }}>
              <Step>
                <StepLabel>Service</StepLabel>
              </Step>
              <Step>
                <StepLabel>Location</StepLabel>
              </Step>
              <Step>
                <StepLabel>Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review</StepLabel>
              </Step>
            </Stepper>
          </Box>
        </Fade>
      )}
      
      {/* Mobile stepper - simplified dots */}
      {isMobile && (
        <Fade in={animateIn}>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              zIndex: 1100,
              display: 'flex',
              gap: 1,
              p: 1,
              borderRadius: 4,
              bgcolor: 'rgba(0,0,0,0.5)',
            }}
          >
            {[0, 1, 2, 3].map((step) => (
              <Box 
                key={step}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: step === 1 ? 'primary.main' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </Box>
        </Fade>
      )}
      
      {/* Full-screen map */}
      <Box 
        ref={mapContainerRef}
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000
        }}
      >
        <OSMMap
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          onPickupLocationChange={handlePickupLocationChange}
          onDropoffLocationChange={handleDropoffLocationChange}
          selectingPickup={selectingPickup}
          setSelectingPickup={setSelectingPickup}
        />
        
        {/* Location selection floating indicator (mobile) - improved contrast */}
        {isMobile && (
          <Fade in={animateIn}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 64, 
                left: '50%', 
                transform: 'translateX(-50%)',
                zIndex: 1200,
                bgcolor: selectingPickup ? 'success.main' : 'error.main',
                color: 'white',
                py: 1,
                px: 2.5,
                borderRadius: 5,
                boxShadow: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2" fontWeight="medium">
                {selectingPickup ? 'Select pickup point' : 'Select dropoff point'}
              </Typography>
            </Box>
          </Fade>
        )}
        
        {/* My location button - larger for mobile */}
        <Fade in={animateIn}>
          <Fab 
            color="primary"
            size={isMobile ? "medium" : "small"}
            aria-label="my location"
            onClick={handleGetCurrentLocation}
            sx={{ 
              position: 'absolute', 
              bottom: isMobile ? (isDrawerOpen ? 'calc(35% + 16px)' : 20) : 20, 
              right: 16,
              zIndex: 1200,
              boxShadow: 3,
              transition: 'bottom 0.3s ease',
              width: isMobile ? 56 : 48,
              height: isMobile ? 56 : 48
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : <MyLocationIcon fontSize={isMobile ? "medium" : "small"} />}
          </Fab>
        </Fade>
      </Box>
      
      {/* Bottom sheet for location input */}
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        swipeAreaWidth={isMobile ? 40 : 0}
        disableSwipeToOpen={!isMobile}
        disableDiscovery={!isMobile}
        variant={isMobile ? "persistent" : "permanent"}
        sx={{
          '& .MuiDrawer-paper': {
            height: getDrawerHeight(),
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            transition: 'height 0.3s ease',
            boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.15)',
            pb: isMobile ? 4 : 2
          },
          zIndex: 1200
        }}
      >
        <Box sx={{ padding: isMobile ? '16px 16px 0' : 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer puller - larger for mobile */}
          {isMobile && (
            <Box 
              sx={{ 
                width: '40%', 
                height: 5, 
                bgcolor: 'rgba(0,0,0,0.1)', 
                borderRadius: 3, 
                mx: 'auto', 
                mb: 2,
                cursor: 'grab'
              }}
              onClick={toggleDrawerHeight}
            />
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant={isMobile ? "h5" : "h6"} fontWeight="bold">Where to?</Typography>
            
            {/* Drawer expand/collapse button (mobile only) - larger touch target */}
            {isMobile && (
              <IconButton onClick={toggleDrawerHeight} size="large" sx={{ p: 1 }}>
                {drawerHeight === 'partial' ? <ExpandMoreIcon fontSize="large" /> : <ExpandLessIcon fontSize="large" />}
              </IconButton>
            )}
          </Box>
          
          {/* Location input fields with enhanced UI */}
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: isMobile ? 3 : 2,
              p: isMobile ? 1.5 : 1.5,
              mb: isMobile ? 2 : 2.5,
              position: 'relative'
            }}
          >
            {/* Pickup field */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box
                sx={{
                  width: isMobile ? 16 : 12,
                  height: isMobile ? 16 : 12,
                  bgcolor: 'success.main',
                  borderRadius: '50%',
                  mr: 2,
                  border: '2px solid white',
                  boxShadow: '0 0 0 2px green'
                }}
              />
              <TextField
                variant="standard"
                fullWidth
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Enter pickup location"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: pickupAddress ? (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handlePickupSearch} 
                        edge="end"
                        size={isMobile ? "medium" : "small"}
                        sx={{ p: isMobile ? 0.5 : 0.5 }}
                      >
                        <SearchIcon fontSize={isMobile ? "medium" : "small"} />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }}
                onFocus={() => {
                  setSelectingPickup(true);
                  if (isMobile && drawerHeight === 'partial') {
                    setDrawerHeight('full');
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePickupSearch();
                  }
                }}
                sx={{
                  '& input': {
                    py: isMobile ? 0.75 : 0.5,
                    fontSize: isMobile ? '1rem' : '0.95rem',
                  }
                }}
              />
            </Box>
            
            {/* Vertical line between pickup and dropoff */}
            <Box 
              sx={{ 
                position: 'absolute',
                left: isMobile ? 26 : 21,
                top: 28,
                bottom: 28,
                width: 2,
                bgcolor: 'grey.300',
                zIndex: 1
              }}
            />
            
            {/* Swap locations button - larger for mobile */}
            <IconButton
              size={isMobile ? "medium" : "small"}
              onClick={handleSwapLocations}
              disabled={!pickupLocation || !dropoffLocation}
              sx={{
                position: 'absolute',
                right: isMobile ? -20 : -16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                zIndex: 2,
                '&:hover': {
                  bgcolor: theme.palette.background.paper,
                },
                width: isMobile ? 40 : 32,
                height: isMobile ? 40 : 32,
                boxShadow: 2
              }}
            >
              <SwapVertIcon fontSize={isMobile ? "medium" : "small"} />
            </IconButton>
            
            {/* Dropoff field */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: isMobile ? 16 : 12,
                  height: isMobile ? 16 : 12,
                  bgcolor: 'error.main',
                  borderRadius: '50%',
                  mr: 2,
                  border: '2px solid white',
                  boxShadow: '0 0 0 2px red'
                }}
              />
              <TextField
                variant="standard"
                fullWidth
                value={dropoffAddress}
                onChange={(e) => setDropoffAddress(e.target.value)}
                placeholder="Enter destination"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: dropoffAddress ? (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handleDropoffSearch} 
                        edge="end"
                        size={isMobile ? "medium" : "small"}
                        sx={{ p: isMobile ? 0.5 : 0.5 }}
                      >
                        <SearchIcon fontSize={isMobile ? "medium" : "small"} />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }}
                onFocus={() => {
                  setSelectingPickup(false);
                  if (isMobile && drawerHeight === 'partial') {
                    setDrawerHeight('full');
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleDropoffSearch();
                  }
                }}
                sx={{
                  '& input': {
                    py: isMobile ? 0.75 : 0.5,
                    fontSize: isMobile ? '1rem' : '0.95rem',
                  }
                }}
              />
            </Box>
          </Paper>
          
          {/* Only show selected locations in expanded view */}
          {drawerHeight === 'full' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>Selected Locations:</Typography>
              
              {pickupLocation && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 1, 
                    py: isMobile ? 1 : 0.5,
                    fontSize: isMobile ? '0.9rem' : '0.85rem'
                  }} 
                  variant="outlined"
                  icon={<LocationOnIcon color="success" />}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.95rem' : '0.85rem' }}>
                    Pickup: {pickupLocation.address}
                  </Typography>
                </Alert>
              )}
              
              {dropoffLocation && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 1, 
                    py: isMobile ? 1 : 0.5,
                    fontSize: isMobile ? '0.9rem' : '0.85rem'
                  }} 
                  variant="outlined"
                  icon={<LocationOnIcon color="error" />}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.95rem' : '0.85rem' }}>
                    Dropoff: {dropoffLocation.address}
                  </Typography>
                </Alert>
              )}
            </Box>
          )}
          
          {/* Action buttons */}
          <Box 
            sx={{ 
              mt: 'auto', 
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              position: isMobile ? 'static' : 'relative',
              bottom: 0,
              left: 0,
              right: 0,
              pt: isMobile ? 0 : 2,
              pb: isMobile ? 0 : 0,
              bgcolor: 'background.paper',
              zIndex: 10
            }}
          >
            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ 
                  flex: 1,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 'medium'
                }}
              >
                Back
              </Button>
            )}
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={!isMobile}
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={!pickupLocation || !dropoffLocation}
              sx={{
                py: isMobile ? 1.5 : 1.2,
                borderRadius: isMobile ? 3 : 2,
                fontWeight: 'bold',
                fontSize: isMobile ? '1rem' : 'inherit',
                flex: isMobile ? 2 : 'auto',
                boxShadow: 3
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
      
      {/* Error snackbar */}
      <Snackbar
        open={searchError !== null}
        autoHideDuration={6000}
        onClose={() => setSearchError(null)}
        anchorOrigin={{ 
          vertical: isMobile ? 'top' : 'bottom', 
          horizontal: 'center' 
        }}
      >
        <Alert 
          onClose={() => setSearchError(null)} 
          severity="error" 
          sx={{ 
            width: '100%',
            boxShadow: 3,
            borderRadius: isMobile ? 2 : 1,
            py: isMobile ? 1.5 : 1
          }}
        >
          {searchError}
        </Alert>
      </Snackbar>
      
      {/* Loading overlay */}
      {isLoading && (
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.3)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: isMobile ? 3 : 2,
              borderRadius: isMobile ? 4 : 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              minWidth: isMobile ? 200 : 180
            }}
          >
            <CircularProgress size={isMobile ? 48 : 32} />
            <Typography 
              variant={isMobile ? 'body1' : 'body2'}
              fontWeight="medium"
            >
              Finding location...
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default LocationSelectionPage; 