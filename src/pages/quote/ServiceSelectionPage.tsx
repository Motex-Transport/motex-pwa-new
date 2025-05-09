import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Stack,
  Container,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { 
  Menu as MenuIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon
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

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
    '& .service-title': {
      color: RED_COLOR,
    }
  },
}));

const ServiceSelectionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);
  
  // Service data
  const services = [
    {
      id: 1,
      title: 'Parcel Delivery',
      description: 'Fast and secure parcel delivery solutions for businesses and individuals. We ensure your packages arrive safely and on schedule.',
      image: '/services-15.jpg'
    },
    {
      id: 2,
      title: 'Fragile Freight',
      description: 'Specialized handling for delicate and valuable items. Our experts use proper techniques and materials to protect your fragile shipments.',
      image: '/gallery 6.jpeg'
    },
    {
      id: 3,
      title: 'Chauffeur Services',
      description: 'Professional chauffeur services with experienced drivers. We provide reliable transportation for executives, special events, and VIP clients.',
      image: '/chauffeur-2.jpg'
    },
    {
      id: 4,
      title: 'Door to Door Service',
      description: 'Convenient pickup and delivery directly from your location to the destination. Let us handle the logistics while you focus on your business.',
      image: '/gallery 2.jpg'
    },
    {
      id: 5,
      title: 'Same Day Delivery',
      description: 'Urgent deliveries handled with speed and reliability. Our same-day service ensures your time-sensitive packages reach their destination promptly.',
      image: '/gallery 3.jpg'
    },
    {
      id: 6,
      title: 'Interstate Delivery',
      description: 'Seamless interstate logistics solutions connecting businesses across Australia. Our fleet ensures safe and timely delivery across state lines.',
      image: '/upscalemedia-transformed.jpeg'
    }
  ];

  const handleSelectService = (service: {id: number; title: string; description: string; image: string}) => {
    navigate('/quote/location', { state: { selectedService: service } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <PageTransition>
      <PageWrapper>
        <ContentSection>
          <Container maxWidth="lg">
            {/* Step Indicator */}
            <StepIndicator>
              <StepDot active />
              <StepDot />
              <StepDot />
              <StepDot />
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
                Select a Service
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 4,
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Choose the service that best fits your needs
              </Typography>
            </Box>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {services.map((service) => (
                  <Grid item xs={6} sm={6} md={4} key={service.id}>
                    <motion.div variants={itemVariants}>
                      <ServiceCard onClick={() => handleSelectService(service)}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={service.image}
                          alt={service.title}
                          sx={{ 
                            opacity: 0.8,
                            height: { xs: 100, sm: 140, md: 200 }
                          }}
                        />
                        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
                          <Typography 
                            variant="h5" 
                            className="service-title"
                            sx={{ 
                              mb: { xs: 0.75, sm: 1, md: 2 },
                              fontWeight: 600,
                              color: 'white',
                              fontFamily: '"Poppins", sans-serif',
                              fontSize: { xs: '0.85rem', sm: '1rem', md: '1.5rem' }
                            }}
                          >
                            {service.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.7)',
                              fontFamily: '"Poppins", sans-serif',
                              lineHeight: { xs: 1.4, sm: 1.6, md: '29px' },
                              fontSize: { xs: '0.75rem', sm: '0.85rem', md: '16px' },
                              fontWeight: 400,
                              display: { xs: 'none', sm: 'block' } // Hide description on extra small screens
                            }}
                          >
                            {service.description}
                          </Typography>
                        </CardContent>
                      </ServiceCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>

          {/* Add padding at the bottom for mobile to prevent content from being hidden under bottom navigation */}
          {isMobile && <Box sx={{ height: '70px' }} />}
        </ContentSection>
      </PageWrapper>
    </PageTransition>
  );
};

export default ServiceSelectionPage; 