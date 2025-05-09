import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar,
  Stack,
  Link,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Paper
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { 
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import PageTransition from '../components/PageTransition';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Helmet } from 'react-helmet-async';

// Define colors
const DARK_BG = '#0A0A0A';
const WHITE_TEXT = '#FFFFFF';
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992';

// Define fonts
const HEADING_FONT = '"Oswald", sans-serif';
const BODY_FONT = '"Mulish", sans-serif';

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  background: '#000000',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
}));

const CircleBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  opacity: 0.3,
  background: 'radial-gradient(circle, rgba(222, 31, 39, 0.8) 0%, rgba(0,0,0,0) 70%)',
  zIndex: 0,
  filter: 'blur(20px)',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/MotexFeb3.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '55vh',
  overflow: 'hidden',
  zIndex: 10,
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 1
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '40vh',
  }
}));

const DecorativeLine = styled(Box)(({ theme }) => ({
  height: '1px',
  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  margin: '0 auto',
  width: '100%',
}));

const ContentSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#000000',
  overflow: 'hidden',
}));

const FounderQuoteCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'linear-gradient(to bottom, #DE1F27, #FF2992)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
  },
}));

const GradientLight = styled('div')({
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${RED_COLOR}30 0%, ${PINK_RED}15 40%, transparent 70%)`,
  filter: 'blur(60px)',
  opacity: 0.8,
  pointerEvents: 'none',
  transition: 'transform 0.15s ease-out, width 0.2s ease, height 0.2s ease',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
});

const AboutUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const navigate = useNavigate();
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const movingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Function to handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Add useEffect for mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Track mouse position relative to the viewport
      setMousePos({ 
        x: e.clientX, 
        y: e.clientY 
      });
      
      // Set moving state
      setIsMoving(true);
      
      // Clear previous timeout
      if (movingTimeout.current) {
        clearTimeout(movingTimeout.current);
      }
      
      // Set timeout to track when movement stops
      movingTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movingTimeout.current) {
        clearTimeout(movingTimeout.current);
      }
    };
  }, []);

  const companyValues = [
    {
      id: 1,
      title: 'Customer-Centric',
      description: 'We place our customers at the center of everything we do, ensuring their needs are met with excellence and care.',
      image: '/aboutus-5.jpeg'
    },
    {
      id: 3,
      title: 'Reliability',
      description: 'We pride ourselves on being dependable, ensuring timely and secure deliveries, every time.',
      image: '/aboutus-3.jpg'
    },
    {
      id: 4,
      title: 'Adaptability',
      description: 'Our flexible approach allows us to meet diverse logistics challenges with customized solutions.',
      image: '/aboutus-4.jpeg'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>About Us - MOTEX Transport</title>
        <meta name="description" content="Learn more about MOTEX Transport, a leading provider of logistics and transportation services across Australia." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Boldonse&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Special+Gothic+Expanded+One&display=swap" rel="stylesheet" />
        <style type="text/css">
          {`
            /* Ensure Special Gothic Expanded One loads correctly */
            @font-face {
              font-family: 'Special Gothic Expanded One';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/specialgothicexpandedone/v1/0Qmk7w_TrIhpkGmiwdkbx0S4BXNBn64tPRTwR3S24D7EGg.ttf) format('truetype');
            }
          `}
        </style>
      </Helmet>
      <GradientBackground>
      {/* Add GlobalStyles for animations */}
      <GlobalStyles
        styles={{
          '@keyframes pulse': {
            '0%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
            '50%': { opacity: 0.25, transform: 'translate(-50%, -50%) scale(1.3)' },
            '100%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
          },
          '@keyframes shine': {
            '0%': { left: '-100%' },
            '20%, 100%': { left: '100%' }
          },
          '@keyframes slideIn': {
            '0%': { transform: 'translateY(50px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 }
          },
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
          },
          '@keyframes slideLogos': {
            '0%': {
              transform: 'translateX(0)',
            },
            '100%': {
              transform: 'translateX(-50%)',
            },
          },
          '.logo-slide-container': {
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative'
          },
          '.logo-slide': {
            display: 'inline-block',
            whiteSpace: 'nowrap',
            animation: 'slideLogos 20s linear infinite',
          }
        }}
      />
      
      {/* Header - Matching landing page */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ 
        py: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.85)', 
        backdropFilter: 'blur(8px)', 
        zIndex: 1100,
        display: isMobile ? 'none' : 'flex' // Hide AppBar on mobile
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
            <Box 
              component="button"
              onClick={() => handleNavigation('/')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer' 
              }}
            >
              <Box 
                component="img" 
                src="/MOTEX+Logo.png" 
                alt="MOTEX Logo" 
                sx={{ height: 28 }} 
              />
            </Box>
          </Box>
          
          {/* Desktop menu in the center */}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '60%' }}>
              <Stack 
                direction="row" 
                spacing={3} 
                sx={{ 
                  color: 'white', 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400,
                  justifyContent: 'center',
                  fontSize: '16px',
                  lineHeight: '29px',
                }}
              >
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/')} 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Home
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/services')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Services
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/about-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    color: RED_COLOR,
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  About Us
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/instant-quote')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Instant Quote
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/gallery')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Gallery
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/contact-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: BODY_FONT,
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Contact
                </Link>
              </Stack>
            </Box>
          )}
          
          {/* Get A Quote button on the right */}
          <Box sx={{ display: 'flex', width: '20%', justifyContent: 'flex-end' }}>
            {!isMobile && (
              <Button 
                variant="contained"
                onClick={() => handleNavigation('/instant-quote')} 
                sx={{ 
                  bgcolor: RED_COLOR, 
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: BODY_FONT,
                  fontWeight: 400,
                  fontSize: '15px',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  minWidth: '130px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: '#c41922',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                  }
                }}
              >
                Get&nbsp;a&nbsp;Quote
              </Button>
            )}
            
            {/* Mobile menu icon */}
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsMobileMenuOpen(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Add toolbar spacer to prevent content from being hidden under the AppBar - only for desktop */}
      {!isMobile && <Box sx={{ height: '64px' }} />}
      
      {/* Hero Section with new tagline and Special Gothic font */}
      <HeroSection>
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3.5rem', md: '5.5rem' },
                fontWeight: 700,
                color: RED_COLOR,
                fontFamily: HEADING_FONT,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                mb: 2
              }}
            >
              OUR STORY
            </Typography>
            
          </motion.div>
        </Container>
      </HeroSection>
      
      {/* Decorative Line */}
      <DecorativeLine />
      
      <ContentSection ref={contentSectionRef} sx={{ width: '100%', overflow: 'hidden' }}>
        {/* Mouse follower gradient light - positioned relative to viewport but not in hero section */}
        <Box sx={{ position: 'relative', display: 'contents', width: '100%', overflow: 'hidden' }}>
          <GradientLight 
            sx={{ 
              left: mousePos.x,
              top: mousePos.y,
              width: isMoving ? '600px' : '400px',
              height: isMoving ? '600px' : '400px',
              opacity: isMoving ? 0.85 : 0.7,
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 1,
              display: { xs: 'none', md: 'block' },
            }} 
          />
        </Box>

        {/* Founder Section with enhanced animations and modernistic design */}
        <Box sx={{ 
          py: { xs: 5, md: 12 }, 
          backgroundColor: DARK_BG, 
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}>
          {/* Circular background patterns with animation */}
          <CircleBackground sx={{ 
            top: '10%', 
            left: '5%',
            width: { xs: '200px', md: '350px' },
            height: { xs: '200px', md: '350px' },
            animation: 'pulse 8s infinite ease-in-out',
          }} />
          <CircleBackground sx={{ 
            bottom: '20%', 
            right: '10%', 
            width: { xs: '180px', md: '280px' },
            height: { xs: '180px', md: '280px' },
            background: 'radial-gradient(circle, rgba(255, 41, 146, 0.8) 0%, rgba(0,0,0,0) 70%)',
            animation: 'pulse 12s infinite ease-in-out',
          }} />
          
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: { xs: 3, md: 6 },
                fontFamily: HEADING_FONT,
                fontWeight: 600,
                color: WHITE_TEXT,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
              }}
            >
              Meet Our Founder
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 4, md: 6 }} alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
              <Grid item xs={5} md={5}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Add parallax effect on hover */}
                  <Box sx={{ position: 'relative' }}>
                    <Box 
                      component="img"
                      src="/roy-founder.jpeg"
                      alt="Roy Baheer - Founder"
                      sx={{
                        width: '100%',
                        maxWidth: { xs: '100%', sm: '85%', md: '85%' },
                        mx: { xs: 'auto', md: 0 },
                        display: 'block',
                        borderRadius: '16px',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'transform 0.5s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Decorative elements - adjusted for mobile */}
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: { xs: '70px', md: '150px' },
                      height: { xs: '70px', md: '150px' },
                      borderRadius: '50%',
                      background: `radial-gradient(circle, rgba(${Number.parseInt(RED_COLOR.slice(1,3), 16)},${Number.parseInt(RED_COLOR.slice(3,5), 16)},${Number.parseInt(RED_COLOR.slice(5,7), 16)},0.1) 0%, rgba(${Number.parseInt(RED_COLOR.slice(1,3), 16)},${Number.parseInt(RED_COLOR.slice(3,5), 16)},${Number.parseInt(RED_COLOR.slice(5,7), 16)},0) 70%)`,
                      zIndex: 0,
                    }}
                    component={motion.div}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    }}
                  />
                </motion.div>
              </Grid>
              
              <Grid item xs={7} md={7}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.9,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      translateY: -5,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <FounderQuoteCard elevation={0} sx={{ 
                      p: { xs: 2, md: 4 },
                      height: '100%'
                    }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontStyle: 'italic',
                          fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' },
                          lineHeight: { xs: 1.4, md: 1.8 },
                          fontFamily: BODY_FONT,
                          mb: { xs: 1, md: 3 },
                          color: 'white',
                          position: 'relative'
                        }}
                      >
                        <Box 
                          component="span"
                          sx={{
                            position: 'absolute',
                            top: { xs: '-10px', md: '-20px' },
                            left: { xs: '-5px', md: '-10px' },
                            fontSize: { xs: '2rem', md: '4rem' },
                            color: 'rgba(222, 31, 39, 0.2)',
                            fontFamily: 'serif',
                            lineHeight: 1
                          }}
                        >
                          "
                        </Box>
                        When I first came into the transport industry I worked for a few big companies and realized that the industry was lacking service and professionalism, so this is where I thought I can bring something new to industry.
                      </Typography>
                      
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'white',
                          fontFamily: HEADING_FONT,
                          fontWeight: 500,
                          letterSpacing: '0.5px',
                          fontSize: { xs: '0.85rem', md: '1.25rem' }
                        }}
                      >
                        - Roy Baheer
                      </Typography>
                    </FounderQuoteCard>
                  </motion.div>
                  
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: { xs: 2, md: 4 },
                          lineHeight: { xs: 1.6, md: 1.8 },
                          fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1.05rem' },
                          opacity: 0.9,
                          fontFamily: BODY_FONT,
                          color: 'white'
                        }}
                      >
                        Motex Transport is a logistics business that Roy Baheer established. Roy has been very successful in the industry and is passionate about providing excellent customer service and experience. His top priority is the happiness of his customers, so Motex Transport offers services beyond expectations.
                      </Typography>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        {/* Decorative Line */}
        <DecorativeLine />
        
        {/* Our Mission section with simple black background */}
        <Box sx={{ 
          py: { xs: 5, md: 12 }, 
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  mb: { xs: 1, md: 2 },
                  fontFamily: HEADING_FONT,
                  fontWeight: 600,
                  color: WHITE_TEXT,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
                }}
              >
                Our Mission
              </Typography>
              
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  maxWidth: 900,
                  mx: 'auto',
                  mb: { xs: 4, md: 8 },
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  lineHeight: { xs: 1.6, md: 1.8 },
                  opacity: 0.9,
                  fontFamily: BODY_FONT,
                  color: 'white',
                  px: { xs: 2, md: 0 }
                }}
              >
                At Motex Transport, we believe that no task is too difficult for us, and we are always eager to learn and gain exposure. Our enthusiastic team will do everything in our power to make your experience with us completely hassle-free. Our team is very experienced and professional, with over years of combined experience in the logistics industry. We can handle all your transportation requirements, from regular deliveries and collections to one-off projects.
              </Typography>
            </motion.div>
            
            {/* Decorative Line */}
            <DecorativeLine sx={{ mb: { xs: 3, md: 6 } }} />
            
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 6,
                fontFamily: HEADING_FONT,
                fontWeight: 600,
                color: WHITE_TEXT,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
              }}
            >
              Our Values
            </Typography>
            
            <Box 
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              sx={{ mt: 5, mb: 6 }}
            >
              {/* Mobile layout with adaptability in center and full width */}
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Grid container spacing={2}>
                  {/* Customer-Centric & Reliability side by side */}
                  <Grid item xs={6}>
                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                      <FeatureCard
                        sx={{
                          height: '100%',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
                            '& .value-title': {
                              color: RED_COLOR
                            }
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={companyValues[0].image}
                          alt={companyValues[0].title}
                          sx={{
                            transition: 'transform 0.5s ease',
                            objectFit: 'cover',
                            height: 100,
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <CardContent sx={{ 
                          p: 1.5, 
                          flexGrow: 1, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center',
                          minHeight: '60px'
                        }}>
                          <Typography 
                            variant="h5" 
                            gutterBottom 
                            className="value-title"
                            sx={{ 
                              fontFamily: BODY_FONT,
                              fontWeight: 700,
                              color: WHITE_TEXT,
                              transition: 'color 0.3s ease',
                              textTransform: 'capitalize',
                              letterSpacing: '0.5px',
                              fontSize: '0.85rem',
                              mb: 0,
                              textAlign: 'center'
                            }}
                          >
                            {companyValues[0].title}
                          </Typography>
                        </CardContent>
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                      <FeatureCard
                        sx={{
                          height: '100%',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
                            '& .value-title': {
                              color: RED_COLOR
                            }
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={companyValues[1].image}
                          alt={companyValues[1].title}
                          sx={{
                            transition: 'transform 0.5s ease',
                            objectFit: 'cover',
                            height: 100,
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <CardContent sx={{ 
                          p: 1.5, 
                          flexGrow: 1, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center',
                          minHeight: '60px'
                        }}>
                          <Typography 
                            variant="h5" 
                            gutterBottom 
                            className="value-title"
                            sx={{ 
                              fontFamily: BODY_FONT,
                              fontWeight: 700,
                              color: WHITE_TEXT,
                              transition: 'color 0.3s ease',
                              textTransform: 'capitalize',
                              letterSpacing: '0.5px',
                              fontSize: '0.85rem',
                              mb: 0,
                              textAlign: 'center'
                            }}
                          >
                            {companyValues[1].title}
                          </Typography>
                        </CardContent>
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                  
                  {/* Adaptability in center */}
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                      <FeatureCard
                        sx={{
                          height: '100%',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          maxWidth: '70%',
                          mx: 'auto',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
                            '& .value-title': {
                              color: RED_COLOR
                            }
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={companyValues[2].image}
                          alt={companyValues[2].title}
                          sx={{
                            transition: 'transform 0.5s ease',
                            objectFit: 'cover',
                            height: 120,
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <CardContent sx={{ 
                          p: 1.5, 
                          flexGrow: 1, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center',
                          minHeight: '60px'
                        }}>
                          <Typography 
                            variant="h5" 
                            gutterBottom 
                            className="value-title"
                            sx={{ 
                              fontFamily: BODY_FONT,
                              fontWeight: 700,
                              color: WHITE_TEXT,
                              transition: 'color 0.3s ease',
                              textTransform: 'capitalize',
                              letterSpacing: '0.5px',
                              fontSize: '0.9rem',
                              mb: 0,
                              textAlign: 'center'
                            }}
                          >
                            {companyValues[2].title}
                          </Typography>
                        </CardContent>
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Desktop and tablet layout */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                  {companyValues.map((value) => (
                    <Grid item xs={6} sm={6} md={4} key={value.id} sx={{ mb: 2 }}>
                      <motion.div variants={itemVariants} style={{ height: '100%' }}>
                        <FeatureCard
                          sx={{
                            height: '100%',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
                              '& .value-title': {
                                color: RED_COLOR
                              }
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={value.image}
                            alt={value.title}
                            sx={{
                              transition: 'transform 0.5s ease',
                              objectFit: 'cover',
                              height: { sm: 140, md: 200 },
                              '&:hover': {
                                transform: 'scale(1.05)'
                              }
                            }}
                          />
                          <CardContent sx={{ 
                            p: { sm: 2, md: 3 }, 
                            flexGrow: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between',
                            minHeight: { sm: '100px', md: '120px' }
                          }}>
                            <Typography 
                              variant="h5" 
                              gutterBottom 
                              className="value-title"
                              sx={{ 
                                fontFamily: BODY_FONT,
                                fontWeight: 700,
                                color: WHITE_TEXT,
                                transition: 'color 0.3s ease',
                                textTransform: 'capitalize',
                                letterSpacing: '0.5px',
                                fontSize: { sm: '1rem', md: '1.5rem' },
                                mb: { sm: 1, md: 2 }
                              }}
                            >
                              {value.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: WHITE_TEXT,
                                fontFamily: BODY_FONT,
                                fontSize: { sm: '0.85rem', md: '0.95rem' },
                                lineHeight: { sm: 1.5, md: 1.6 }
                              }}
                            >
                              {value.description}
                            </Typography>
                          </CardContent>
                        </FeatureCard>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
        
        {/* Decorative Line */}
        <DecorativeLine />
      </ContentSection>
      
      {/* Add padding at the bottom for mobile to prevent content from being hidden under bottom navigation */}
      {isMobile && <Box sx={{ height: '70px' }} />}
      
      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            backgroundColor: DARK_BG,
            padding: { xs: 2, sm: 3 }
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton 
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box component="img" src="/MOTEX+Logo.png" alt="MOTEX Logo" sx={{ width: 120, my: 2 }} />
        
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Home" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/services');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Services" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/about-us');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
              }}
            >
              <ListItemText 
                primary="About Us" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 600, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/instant-quote');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Instant Quote" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/gallery');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Gallery" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/contact-us');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Contact Us" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Box sx={{ p: 2, mt: 2 }}>
          <Button 
            onClick={() => {
              handleNavigation('/instant-quote');
              setIsMobileMenuOpen(false);
            }}
            variant="contained" 
            fullWidth
            sx={{
              backgroundColor: RED_COLOR,
              color: 'white',
              fontFamily: HEADING_FONT,
              fontWeight: 500,
              py: 1,
              borderRadius: 1,
              transition: '0.3s',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: '#c50000',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            Get a Quote
          </Button>
        </Box>
      </Drawer>
      </GradientBackground>
    </PageTransition>
  );
};

export default AboutUsPage;