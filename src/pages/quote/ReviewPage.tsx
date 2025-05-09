import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Paper,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { 
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  LocationOn as LocationOnIcon,
  Today as TodayIcon,
  AccessTime as AccessTimeIcon,
  LocalShipping as LocalShippingIcon,
  Info as InfoIcon
} from '@mui/icons-material';

// Define colors
const DARK_BG = '#0A0A0A';
const WHITE_TEXT = '#FFFFFF';
const RED_COLOR = '#DE1F27';

// Styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  backgroundColor: DARK_BG,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: DARK_BG,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  color: WHITE_TEXT,
  overflowY: 'auto',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StepIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

const StepDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active, theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? RED_COLOR : 'rgba(255, 255, 255, 0.3)',
  margin: '0 6px',
  transition: 'background-color 0.3s ease',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: RED_COLOR,
  },
}));

const DetailItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.875rem',
  fontWeight: 400,
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  color: WHITE_TEXT,
  fontSize: '1rem',
  fontWeight: 500,
}));

const NextButton = styled(Button)(({ theme }) => ({
  backgroundColor: RED_COLOR,
  color: WHITE_TEXT,
  padding: '12px 24px',
  borderRadius: '50px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#c41922',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  padding: '12px 24px',
  borderRadius: '50px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  marginRight: theme.spacing(2),
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginRight: 0,
    marginBottom: theme.spacing(2),
  },
}));

const SuccessDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: DARK_BG,
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  '& .MuiDialogTitle-root': {
    backgroundColor: 'rgba(222, 31, 39, 0.1)',
    color: WHITE_TEXT,
  },
}));

function getSizeText(value: number): string {
  switch (value) {
    case 1:
      return 'Small';
    case 2:
      return 'Medium';
    case 3:
      return 'Large';
    case 4:
      return 'Extra Large';
    default:
      return 'Unknown';
  }
}

function getWeightText(value: number): string {
  switch (value) {
    case 1:
      return 'Light (0-5 kg)';
    case 2:
      return 'Medium (5-20 kg)';
    case 3:
      return 'Heavy (20-50 kg)';
    case 4:
      return 'Very Heavy (50+ kg)';
    default:
      return 'Unknown';
  }
}

const ReviewPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // All state from previous steps
  const { 
    selectedService, 
    pickupLocation, 
    dropoffLocation, 
    distance, 
    duration,
    date,
    time,
    size,
    weight,
    packageType,
    specialInstructions
  } = location.state || {};
  
  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    window.scrollTo(0, 0);
    
    // Check if previous steps data exists, if not redirect
    if (!selectedService || !pickupLocation || !dropoffLocation || !date || !time) {
      navigate('/quote/service');
    }
    
    return () => clearTimeout(timer);
  }, [navigate, selectedService, pickupLocation, dropoffLocation, date, time]);
  
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };
  
  const handleBack = () => {
    navigate('/quote/details', { 
      state: { 
        selectedService,
        pickupLocation,
        dropoffLocation,
        distance,
        duration
      } 
    });
  };
  
  const handleClose = () => {
    setSuccess(false);
    navigate('/quote-success', { 
      state: { quoteData: {
        service: selectedService?.title,
        pickupLocation,
        dropoffLocation,
        date,
        time
      }}
    });
  };
  
  return (
    <PageTransition>
      <PageWrapper>
        <ContentSection>
          <Container maxWidth="lg">
            {/* Step Indicator */}
            <StepIndicator>
              <StepDot />
              <StepDot />
              <StepDot />
              <StepDot active />
            </StepIndicator>

            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontFamily: '"Oswald", sans-serif',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Review Your Quote
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 2,
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Please confirm all details before submitting
              </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={8} lg={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper 
                    sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  >
                    {/* Service Details */}
                    <Box sx={{ mb: 3 }}>
                      <SectionTitle>
                        <LocalShippingIcon />
                        Service
                      </SectionTitle>
                      <List disablePadding>
                        <DetailItem>
                          <ListItemText
                            primary={
                              <DetailValue>
                                {selectedService?.title}
                              </DetailValue>
                            }
                            secondary={
                              <DetailLabel>
                                {selectedService?.description}
                              </DetailLabel>
                            }
                          />
                        </DetailItem>
                      </List>
                    </Box>
                    
                    <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />

                    {/* Location Details */}
                    <Box sx={{ mb: 3 }}>
                      <SectionTitle>
                        <LocationOnIcon />
                        Locations
                      </SectionTitle>
                      <List disablePadding>
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Pickup Location</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{pickupLocation}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                        
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Dropoff Location</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{dropoffLocation}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                        
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Distance</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{distance}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                        
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Est. Duration</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{duration}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                      </List>
                    </Box>
                    
                    <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />

                    {/* Time Details */}
                    <Box sx={{ mb: 3 }}>
                      <SectionTitle>
                        <TodayIcon />
                        Schedule
                      </SectionTitle>
                      <List disablePadding>
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Pickup Date</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{date}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                        
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Pickup Time</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{time}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                      </List>
                    </Box>
                    
                    <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />

                    {/* Package Details */}
                    <Box sx={{ mb: 3 }}>
                      <SectionTitle>
                        <InfoIcon />
                        Package Details
                      </SectionTitle>
                      <List disablePadding>
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Package Type</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{packageType}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                        
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Size</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{getSizeText(size)}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                        
                        <DetailItem>
                          <Grid container>
                            <Grid item xs={4}>
                              <DetailLabel>Weight</DetailLabel>
                            </Grid>
                            <Grid item xs={8}>
                              <DetailValue>{getWeightText(weight)}</DetailValue>
                            </Grid>
                          </Grid>
                        </DetailItem>
                        
                        {specialInstructions && (
                          <DetailItem>
                            <Grid container>
                              <Grid item xs={4}>
                                <DetailLabel>Special Instructions</DetailLabel>
                              </Grid>
                              <Grid item xs={8}>
                                <DetailValue>{specialInstructions}</DetailValue>
                              </Grid>
                            </Grid>
                          </DetailItem>
                        )}
                      </List>
                    </Box>
                    
                    <Box sx={{ 
                      mt: 4, 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between'
                    }}>
                      <BackButton 
                        onClick={handleBack}
                        startIcon={<ArrowBackIcon />}
                      >
                        Back
                      </BackButton>
                      
                      <NextButton 
                        onClick={handleSubmit}
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                      >
                        {loading ? 'Submitting...' : 'Submit Quote Request'}
                      </NextButton>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>

          {/* Add padding at the bottom for mobile to prevent content from being hidden under bottom navigation */}
          {isMobile && <Box sx={{ height: '70px' }} />}
        </ContentSection>
        
        {/* Success Dialog */}
        <SuccessDialog
          open={success}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckIcon sx={{ color: RED_COLOR, mr: 1 }} />
              Quote Request Submitted
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2, color: WHITE_TEXT }}>
              Your quote request has been successfully submitted! We'll get back to you as soon as possible.
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Quote Reference: MOT-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-{new Date().getFullYear()}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleClose}
              variant="contained"
              sx={{ 
                bgcolor: RED_COLOR,
                color: WHITE_TEXT,
                '&:hover': {
                  bgcolor: '#c41922',
                }
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </SuccessDialog>
      </PageWrapper>
    </PageTransition>
  );
};

export default ReviewPage;