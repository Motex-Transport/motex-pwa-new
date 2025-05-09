import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Divider,
  Chip,
  Grid,
  Avatar,
  SwipeableDrawer,
  Fade,
  List,
  ListItem
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import OSMMap, { LocationData } from '../../components/Map/OSMMap';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StraightenIcon from '@mui/icons-material/Straighten';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScaleIcon from '@mui/icons-material/Scale';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsIcon from '@mui/icons-material/Directions';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Styles that would normally be in a styled component
const DateTimePickerWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ 
    '& .MuiOutlinedInput-root': { 
      bgcolor: 'rgba(255,255,255,0.05)',
      '&:hover': {
        bgcolor: 'rgba(255,255,255,0.08)',
      }
    }
  }}>
    {children}
  </Box>
);

const DetailItem = ({ children }: { children: React.ReactNode }) => (
  <ListItem sx={{ py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
    {children}
  </ListItem>
);

const DetailLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
    {children}
  </Typography>
);

const DetailValue = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
    {children}
  </Typography>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography 
    variant="subtitle1" 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1, 
      mb: 1, 
      fontWeight: 'bold' 
    }}
  >
    {children}
  </Typography>
);

const DetailsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State from previous steps
  const { 
    selectedService, 
    pickupLocation, 
    dropoffLocation, 
    pickupCoordinates,
    dropoffCoordinates,
    distance, 
    duration 
  } = location.state || {};
  
  // Form state
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs().add(1, 'day'));
  const [time, setTime] = useState<dayjs.Dayjs | null>(dayjs().hour(10).minute(0));
  const [size, setSize] = useState<number>(2);
  const [weight, setWeight] = useState<number>(2);
  const [packageType, setPackageType] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [drawerHeight, setDrawerHeight] = useState<'partial' | 'full'>('partial');
  const [animateIn, setAnimateIn] = useState(false);
  
  // Package type options
  const packageTypes = [
    'Small Parcel',
    'Medium Box',
    'Large Box',
    'Document Envelope',
    'Fragile Item',
    'Electronics',
    'Other'
  ];
  
  // Create LocationData objects for the map
  const [pickupData, setPickupData] = useState<LocationData | null>(null);
  const [dropoffData, setDropoffData] = useState<LocationData | null>(null);
  
  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setAnimateIn(true);
    }, 100);
    window.scrollTo(0, 0);
    
    // Check if previous step data exists, if not redirect
    if (!selectedService || !pickupLocation || !dropoffLocation) {
      navigate('/quote/service');
    }
    
    // Initialize location data for the map when component mounts
    if (pickupLocation && pickupCoordinates) {
      setPickupData({
        address: pickupLocation,
        latLng: pickupCoordinates
      });
    }
    
    if (dropoffLocation && dropoffCoordinates) {
      setDropoffData({
        address: dropoffLocation,
        latLng: dropoffCoordinates
      });
    }
    
    return () => clearTimeout(timer);
  }, [navigate, selectedService, pickupLocation, dropoffLocation, pickupCoordinates, dropoffCoordinates]);
  
  const handleNext = () => {
    navigate('/quote/review', { 
      state: { 
        selectedService,
        pickupLocation,
        dropoffLocation,
        pickupCoordinates,
        dropoffCoordinates,
        distance,
        duration,
        date: date?.format('YYYY-MM-DD'),
        time: time?.format('HH:mm'),
        size,
        weight,
        packageType,
        specialInstructions
      } 
    });
  };
  
  const handleBack = () => {
    navigate('/quote/location', { 
      state: { 
        selectedService
      } 
    });
  };
  
  const handleSizeChange = (event: Event, newValue: number | number[]) => {
    setSize(newValue as number);
  };
  
  const handleWeightChange = (event: Event, newValue: number | number[]) => {
    setWeight(newValue as number);
  };
  
  const toggleDrawerHeight = () => {
    setDrawerHeight(drawerHeight === 'partial' ? 'full' : 'partial');
  };
  
  // Determine drawer height based on state and screen size
  const getDrawerHeight = () => {
    if (!isMobile) return '60%';
    return drawerHeight === 'partial' ? '40%' : '80%';
  };
  
  // Helper to get formatted size label
  const getSizeLabel = (size: number) => {
    if (size <= 1) return 'Small (< 1m³)';
    if (size <= 3) return 'Medium (1-3m³)';
    if (size <= 6) return 'Large (3-6m³)';
    return 'Extra Large (> 6m³)';
  };
  
  // Helper to get formatted weight label
  const getWeightLabel = (weight: number) => {
    if (weight <= 1) return 'Light (< 1kg)';
    if (weight <= 5) return 'Medium (1-5kg)';
    if (weight <= 15) return 'Heavy (5-15kg)';
    return 'Very Heavy (> 15kg)';
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
      {/* Back button (shown on non-mobile) */}
      {!isMobile && (
        <Fade in={animateIn}>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 20, 
              left: 20, 
              zIndex: 1100 
            }}
          >
            <IconButton 
              onClick={handleBack}
              sx={{ 
                bgcolor: 'white', 
                boxShadow: 2,
                '&:hover': { bgcolor: 'white', opacity: 0.9 }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
        </Fade>
      )}
      
      {/* Header with step indicator (only shown on desktop) */}
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
            <Stepper activeStep={2} sx={{ width: 400 }}>
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
      
      {/* Map view */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 900
        }}
      >
        {/* Add the OSMMap component here */}
        {pickupData && dropoffData && (
          <OSMMap
            pickupLocation={pickupData}
            dropoffLocation={dropoffData}
            onPickupLocationChange={() => {}} // Read-only in this view
            onDropoffLocationChange={() => {}} // Read-only in this view
            selectingPickup={false}
            setSelectingPickup={() => {}} // Read-only in this view
          />
        )}
      </Box>
      
      {/* Bottom sheet for details */}
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        swipeAreaWidth={isMobile ? 30 : 0}
        disableSwipeToOpen={!isMobile}
        disableDiscovery={!isMobile}
        variant={isMobile ? "persistent" : "permanent"}
        sx={{
          '& .MuiDrawer-paper': {
            height: getDrawerHeight(),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transition: 'height 0.3s ease',
            boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
            pb: 2
          },
          zIndex: 1200
        }}
      >
        <Box sx={{ padding: 2, height: '100%', overflow: 'auto' }}>
          {/* Drawer puller */}
          {isMobile && (
            <Box 
              sx={{ 
                width: '30%', 
                height: 4, 
                bgcolor: 'rgba(0,0,0,0.1)', 
                borderRadius: 2, 
                mx: 'auto', 
                mb: 2,
                cursor: 'grab'
              }}
              onClick={toggleDrawerHeight}
            />
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Package Details</Typography>
            
            {/* Drawer expand/collapse button (mobile only) */}
            {isMobile && (
              <IconButton onClick={toggleDrawerHeight} size="small">
                {drawerHeight === 'partial' ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            )}
          </Box>
          
          {/* Route info summary */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 2, 
              bgcolor: theme.palette.primary.main, 
              color: 'white'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1, color: '#4CAF50' }} />
                  <Typography variant="body2" fontWeight="medium" noWrap>{pickupLocation}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', ml: 1.1, my: 0.5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: 1, height: 15, bgcolor: 'rgba(255,255,255,0.5)' }} />
                    <Box sx={{ width: 1, height: 15, bgcolor: 'rgba(255,255,255,0.5)' }} />
                  </Box>
                  <Box sx={{ ml: 1.5 }}>
                    <Chip 
                      label={distance} 
                      size="small" 
                      variant="outlined" 
                      icon={<StraightenIcon fontSize="small" />} 
                      sx={{ 
                        borderColor: 'rgba(255,255,255,0.5)', 
                        color: 'white',
                        mr: 1,
                        '& .MuiChip-icon': { color: 'white' }
                      }}
                    />
                    <Chip 
                      label={duration} 
                      size="small" 
                      variant="outlined" 
                      icon={<AccessTimeIcon fontSize="small" />} 
                      sx={{ 
                        borderColor: 'rgba(255,255,255,0.5)', 
                        color: 'white',
                        '& .MuiChip-icon': { color: 'white' }
                      }}
                    />
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1, color: '#F44336' }} />
                  <Typography variant="body2" fontWeight="medium" noWrap>{dropoffLocation}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DateTimePickerWrapper>
                  <DatePicker
                    label="Pickup Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    disablePast
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        InputProps: {
                          startAdornment: (
                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                              <TodayIcon sx={{ color: 'primary.main' }} />
                            </Box>
                          ),
                        },
                      },
                    }}
                  />
                </DateTimePickerWrapper>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <DateTimePickerWrapper>
                  <TimePicker
                    label="Pickup Time"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        InputProps: {
                          startAdornment: (
                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                              <AccessTimeIcon sx={{ color: 'primary.main' }} />
                            </Box>
                          ),
                        },
                      },
                    }}
                  />
                </DateTimePickerWrapper>
              </Grid>
            </Grid>
          </LocalizationProvider>
          
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShippingIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                Package Size
              </Typography>
              <Chip 
                label={getSizeLabel(size)} 
                color="primary" 
                variant="outlined" 
                size="small" 
              />
            </Box>
            <Slider
              value={size}
              onChange={handleSizeChange}
              min={0}
              max={10}
              step={0.5}
              aria-labelledby="package-size-slider"
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}m³`}
              marks={[
                { value: 0, label: 'S' },
                { value: 3, label: 'M' },
                { value: 6, label: 'L' },
                { value: 10, label: 'XL' },
              ]}
            />
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                <ScaleIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                Package Weight
              </Typography>
              <Chip 
                label={getWeightLabel(weight)} 
                color="primary" 
                variant="outlined" 
                size="small" 
              />
            </Box>
            <Slider
              value={weight}
              onChange={handleWeightChange}
              min={0}
              max={20}
              step={0.5}
              aria-labelledby="package-weight-slider"
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}kg`}
              marks={[
                { value: 0, label: '0kg' },
                { value: 5, label: '5kg' },
                { value: 10, label: '10kg' },
                { value: 20, label: '20kg' },
              ]}
            />
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="package-type-label">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InventoryIcon sx={{ mr: 1, fontSize: 20 }} /> Package Type
                </Box>
              </InputLabel>
              <Select
                labelId="package-type-label"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InventoryIcon sx={{ mr: 1, fontSize: 20 }} /> Package Type
                  </Box>
                }
              >
                {packageTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Special Instructions (Optional)"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Add any special instructions for the driver..."
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, mt: 1, display: 'flex', alignItems: 'flex-start' }}>
                    <DescriptionIcon sx={{ color: 'text.secondary' }} />
                  </Box>
                ),
              }}
            />
          </Box>
          
          {/* Action buttons */}
          <Box 
            sx={{ 
              mt: 4, 
              display: 'flex',
              gap: 1,
              justifyContent: 'space-between'
            }}
          >
            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ flex: 1 }}
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
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                flex: isMobile ? 2 : 'auto'
              }}
            >
              Continue to Review
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default DetailsPage; 