// eslint-disable-next-line
import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Stack,
  Link,
  Container,
  AppBar,
  Toolbar,
  Divider,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import PageTransition from '../components/PageTransition';
import { styled, Theme, keyframes } from '@mui/material/styles';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  LocalShipping as LocalShippingIcon,
  Speed as SpeedIcon,
  Public as PublicIcon,
  Inventory as InventoryIcon,
  Apartment as ApartmentIcon,
  EventAvailable as EventAvailableIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import React from 'react';

// Import fonts
// Oswald font is loaded via Google Fonts in embedded code
// Poppins font is loaded via Google Fonts in embedded code

// Define colors
const DARK_BG = '#0A0A0A';
const DARKER_BG = '#050505';
const WHITE_TEXT = '#FFFFFF';
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992';

// Add TextFade component
const TextFade = ({
  direction = 'down',
  children,
  staggerChildren = 0.1,
}: {
  direction?: 'up' | 'down';
  children: React.ReactNode;
  staggerChildren?: number;
}) => {
  const FADE_ANIMATION = {
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3 } },
    hidden: { opacity: 0, y: direction === 'down' ? -18 : 18 },
  };
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      style={{ width: '100%', textAlign: 'center' }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_ANIMATION}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
};

const GradientSpan = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg,#DE1F27 0%,#DE1F27 50%,#DE1F27 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontWeight: 600,
  fontFamily: '"Oswald", sans-serif',
  letterSpacing: '1px',
  textTransform: 'uppercase'
}));

// Animation keyframes
const float = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const pulse = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 0.6; }
  100% { opacity: 0.4; }
`;

// Animation keyframes for traffic lanes
const moveTraffic = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Transportation route effect
const RouteMap = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '200%',
  height: '100%',
  background: `
    linear-gradient(90deg, transparent 0%, transparent 49%, ${RED_COLOR}40 50%, transparent 51%, transparent 100%),
    linear-gradient(0deg, transparent 0%, transparent 49%, ${RED_COLOR}40 50%, transparent 51%, transparent 100%)
  `,
  backgroundSize: '80px 80px',
  opacity: 0.45,
  zIndex: 0,
  animation: `${float} 35s linear infinite`,
  pointerEvents: 'none',
}));

const HighwayPattern = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '200%',
  height: '100%',
  background: `
    repeating-linear-gradient(90deg, 
      transparent, 
      transparent 100px, 
      ${RED_COLOR}60 100px, 
      ${RED_COLOR}60 120px, 
      transparent 120px, 
      transparent 200px
    )
  `,
  opacity: 0.35,
  zIndex: 0,
  animation: `${float} 20s linear infinite, ${pulse} 4s ease-in-out infinite`,
  pointerEvents: 'none',
}));

// Mouse follower gradient effect
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

// Styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  backgroundColor: DARKER_BG,
  [theme.breakpoints.down('md')]: {
    minHeight: '-webkit-fill-available'
  }
}));

const ContentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: DARK_BG,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  color: WHITE_TEXT,
  overflowY: 'auto',
  position: 'relative',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/motex-transport-vehicle8.jpg")',
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

const TestimonialCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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

const TrafficLanes = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '25%',
  left: 0,
  width: '200%',
  height: '50%',
  background: `
    repeating-linear-gradient(90deg, 
      transparent,
      transparent 30px, 
      ${RED_COLOR}80 30px, 
      ${RED_COLOR}80 60px
    )
  `,
  backgroundSize: '90px 8px',
  backgroundRepeat: 'repeat-x',
  opacity: 0.7,
  zIndex: 0,
  animation: `${moveTraffic} 10s linear infinite`,
  pointerEvents: 'none',
}));

// Carousel components
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  touchAction: 'pan-y',
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  width: '100%',
}));

const ServicesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Testimonial carousel state
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);

  // Add a function for handling testimonial slide changes
  const handleNextTestimonialSlide = useCallback(() => {
    setActiveTestimonialSlide((prev: number) => (prev === 2 ? 0 : prev + 1));
  }, []);

  // Set up auto-scroll for testimonials with mobile optimization
  useEffect(() => {
    if (!isMobile) return; // Only run on mobile
    
    const intervalTime = 8000;
    
    const interval = setInterval(() => {
      handleNextTestimonialSlide();
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [handleNextTestimonialSlide, isMobile]);
  
  // Mouse position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const movingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Update mouse position
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
  
  // Function to handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setIsMobileMenuOpen(true);
  };
  
  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
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

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "The service we received from Motex Transport was extremely professional, efficient and cost effective. Roy was an absolute life saver for us, during an extremely busy period for the business. We had multiple delivery drops - one being on a Saturday - and nothing was an issue. We liked that we could communicate directly with the driver, which was extremely reassuring for us when goods needed to be delivered within allocated time slots. He also continued to communicate with us in terms of delivery ETA's and updates. This really saved us sooooo much stress and pressure. We hope to continue to use Motex moving forward. Well done and thank you for your professionalism and wonderful service.",
      author: "Natalie Tennant",
      company: "Hunter Valley Wedding Planner"
    },
    {
      id: 2,
      quote: "Our premises are a challenge for deliveries with stairs and uneven surfaces, however Roy (Motex) has for many years delivered boxes to us with efficiency, care and cheerfulness. This makes a huge difference as we are a small staff yet often have deliveries varying from 5 - 30 boxes at different times of the year. This enables us to function well and always be on top of stock and supply. I would highly recommend Motex Transport to any size or type of business - you won't be disappointed!",
      author: "Christine Mill",
      company: "CWCI Australia"
    },
    {
      id: 3,
      quote: "The Motex Team consistently go that extra mile for the customer. In order to free up the time of our staff on the ground, the Motex team go above and beyond the typical expectations to ensure we as the customer are always put first whilst carrying out the job to an exemplary level. I would highly recommend and endorse Motex as being an excellent company, and we will most certainly continue to use their services.",
      author: "Adam",
      company: "Sydney Visitor Centre"
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
      <PageWrapper>
      {/* Header - Updated to match landing page */}
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
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/');
              }}
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
                  fontFamily: '"Mulish", sans-serif', 
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
                    fontFamily: '"Mulish", sans-serif',
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
                  sx={{ 
                    color: RED_COLOR,
                    textDecoration: 'none',
                    fontFamily: '"Mulish", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 600,
                    '&:hover': { color: RED_COLOR }
                  }}
                >
                  Services
                </Link>
                <Link 
                  component="button"
                  onClick={() => handleNavigation('/about-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ '&:hover': { color: RED_COLOR } }}
                >
                  About Us
                </Link>
                <Link 
                  component="button"
                  onClick={() => handleNavigation('/instant-quote')}
                  color="inherit" 
                  underline="none" 
                  sx={{ '&:hover': { color: RED_COLOR } }}
                >
                  Instant Quote
                </Link>
                <Link 
                  component="button"
                  onClick={() => handleNavigation('/gallery')}
                  color="inherit" 
                  underline="none" 
                  sx={{ '&:hover': { color: RED_COLOR } }}
                >
                  Gallery
                </Link>
                <Link 
                  component="button"
                  onClick={() => handleNavigation('/contact-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ '&:hover': { color: RED_COLOR } }}
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
                component="button" 
                onClick={() => handleNavigation('/instant-quote')} 
                variant="contained" 
                sx={{ 
                  bgcolor: RED_COLOR, 
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: '"Mulish", sans-serif',
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
      
      {/* Toolbar spacer to prevent content from being hidden under fixed AppBar - only for desktop */}
      {!isMobile && <Box sx={{ height: '64px' }} />}
      
      <ContentSection ref={contentSectionRef}>
        {/* Mouse follower gradient light - positioned relative to viewport */}
        <GradientLight 
          sx={{ 
            left: mousePos.x,
            top: mousePos.y,
            width: isMoving ? '600px' : '400px',
            height: isMoving ? '600px' : '400px',
            opacity: isMoving ? 0.85 : 0.7,
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 1
          }} 
        />
        
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'flex-start', 
                alignItems: 'flex-start' 
              }}
            >
              <Typography 
                variant="h2" 
                align="left" 
                sx={{ 
                  mb: 1,
                  fontWeight: 800,
                  color: RED_COLOR,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: { xs: '1px', sm: '2px', md: '3px' }
                }}
              >
                <TextFade direction="down" staggerChildren={0.03}>
                  <div style={{ whiteSpace: 'nowrap' }}>
                    OUR SERVICES
                  </div>
                </TextFade>
              </Typography>
            </motion.div>
          </Container>
        </HeroSection>

        {/* Content wrapper */}
        <Box sx={{ position: 'relative' }}>
          {/* Services Section */}
          <Box 
            sx={{ py: { xs: 4, md: 6 }, position: 'relative', overflow: 'hidden' }}
          >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                  {services.map((service) => (
                    <Grid item xs={6} sm={4} md={4} key={service.id}>
                      <motion.div variants={itemVariants}>
                        <ServiceCard onClick={() => {
                          navigate('/instant-quote', { state: { selectedService: service.title } });
                          window.scrollTo(0, 0);
                        }}>
                          <CardMedia
                            component="img"
                            height="150"
                            image={service.image}
                            alt={service.title}
                            sx={{ 
                              opacity: 0.8,
                              height: { xs: 100, sm: 120, md: 150 }
                            }}
                          />
                          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                            <Typography 
                              variant="h5" 
                              className="service-title"
                              sx={{ 
                                mb: { xs: 0.75, sm: 1, md: 1.5 },
                                fontWeight: 600,
                                color: 'white',
                                fontFamily: '"Mulish", sans-serif',
                                fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem' }
                              }}
                            >
                              {service.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.7)',
                                fontFamily: '"Mulish", sans-serif',
                                lineHeight: { xs: 1.4, sm: 1.6, md: '24px' },
                                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
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
          </Box>

          {/* Testimonials Section */}
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.3)', py: { xs: 5, md: 8 } }}>
            <Container maxWidth="lg">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Typography 
                  variant="h2" 
                  align="center" 
                  sx={{ 
                    mb: { xs: 1, md: 2 },
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: '"Oswald", sans-serif',
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
                  }}
                >
                  CLIENT TESTIMONIALS
                </Typography>
                <Typography 
                  variant="body1" 
                  align="center" 
                  sx={{ 
                    mb: 6,
                    color: 'rgba(255,255,255,0.7)',
                    maxWidth: '700px',
                    mx: 'auto',
                    fontFamily: '"Mulish", sans-serif',
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '16px' },
                    lineHeight: { xs: 1.5, md: '29px' },
                    fontWeight: 400
                  }}
                >
                  Don't just take our word for it. Here's what our clients have to say about our services.
                </Typography>

                {/* Desktop testimonials grid */}
                {!isMobile && (
                  <Grid container spacing={4}>
                    {testimonials.map((testimonial) => (
                      <Grid item xs={12} md={4} key={testimonial.id}>
                        <TestimonialCard sx={{ minHeight: '350px' }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                mb: 3, 
                                fontStyle: 'italic',
                                color: 'white',
                                fontFamily: '"Mulish", sans-serif',
                                lineHeight: '29px',
                                fontSize: '16px',
                                fontWeight: 400
                              }}
                            >
                              "{testimonial.quote}"
                            </Typography>
                          </Box>
                          <Box>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 600,
                                color: 'white',
                                fontFamily: '"Mulish", sans-serif',
                              }}
                            >
                              {testimonial.author}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.7)',
                                fontFamily: '"Mulish", sans-serif',
                                fontSize: '16px',
                                lineHeight: '29px',
                                fontWeight: 400
                              }}
                            >
                              {testimonial.company}
                            </Typography>
                          </Box>
                        </TestimonialCard>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {/* Mobile testimonial carousel */}
                {isMobile && (
                  <Box>
                    <CarouselContainer>
                      <CarouselTrack 
                        ref={testimonialCarouselRef}
                        sx={{ 
                          transform: `translateX(-${activeTestimonialSlide * 100}%)`,
                        }}
                      >
                        {/* First Testimonial Slide */}
                        <Box 
                          sx={{ 
                            display: 'flex',
                            width: '100%',
                            flexShrink: 0,
                            justifyContent: 'center',
                            p: { xs: 2 }
                          }}
                        >
                          <TestimonialCard sx={{ width: '100%' }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  mb: 2, 
                                  lineHeight: 1.5,
                                  fontFamily: '"Mulish", sans-serif',
                                  fontStyle: 'italic',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  fontSize: '0.75rem',
                                  maxHeight: '200px',
                                  overflow: 'auto'
                                }}
                              >
                                "{testimonials[0].quote}"
                              </Typography>
                            </Box>
                            <Box>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 600,
                                  color: 'white',
                                  fontFamily: '"Mulish", sans-serif',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {testimonials[0].author}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255,255,255,0.7)',
                                  fontFamily: '"Mulish", sans-serif',
                                  fontSize: '0.75rem',
                                  fontWeight: 400
                                }}
                              >
                                {testimonials[0].company}
                              </Typography>
                            </Box>
                          </TestimonialCard>
                        </Box>

                        {/* Second Testimonial Slide */}
                        <Box 
                          sx={{ 
                            display: 'flex',
                            width: '100%',
                            flexShrink: 0,
                            justifyContent: 'center',
                            p: { xs: 2 }
                          }}
                        >
                          <TestimonialCard sx={{ width: '100%' }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  mb: 2, 
                                  lineHeight: 1.5,
                                  fontFamily: '"Mulish", sans-serif',
                                  fontStyle: 'italic',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  fontSize: '0.75rem',
                                  maxHeight: '200px',
                                  overflow: 'auto'
                                }}
                              >
                                "{testimonials[1].quote}"
                              </Typography>
                            </Box>
                            <Box>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 600,
                                  color: 'white',
                                  fontFamily: '"Mulish", sans-serif',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {testimonials[1].author}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255,255,255,0.7)',
                                  fontFamily: '"Mulish", sans-serif',
                                  fontSize: '0.75rem',
                                  fontWeight: 400
                                }}
                              >
                                {testimonials[1].company}
                              </Typography>
                            </Box>
                          </TestimonialCard>
                        </Box>

                        {/* Third Testimonial Slide */}
                        <Box 
                          sx={{ 
                            display: 'flex',
                            width: '100%',
                            flexShrink: 0,
                            justifyContent: 'center',
                            p: { xs: 2 }
                          }}
                        >
                          <TestimonialCard sx={{ width: '100%' }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  mb: 2, 
                                  lineHeight: 1.5,
                                  fontFamily: '"Mulish", sans-serif',
                                  fontStyle: 'italic',
                                  color: 'rgba(255, 255, 255, 0.9)',
                                  fontSize: '0.75rem',
                                  maxHeight: '200px',
                                  overflow: 'auto'
                                }}
                              >
                                "{testimonials[2].quote}"
                              </Typography>
                            </Box>
                            <Box>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 600,
                                  color: 'white',
                                  fontFamily: '"Mulish", sans-serif',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {testimonials[2].author}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255,255,255,0.7)',
                                  fontFamily: '"Mulish", sans-serif',
                                  fontSize: '0.75rem',
                                  fontWeight: 400
                                }}
                              >
                                {testimonials[2].company}
                              </Typography>
                            </Box>
                          </TestimonialCard>
                        </Box>
                      </CarouselTrack>
                    </CarouselContainer>
                    
                    {/* Dots indicator for testimonial slides */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                      {[
                        { id: 'testimonial-dot-1', value: 0 }, 
                        { id: 'testimonial-dot-2', value: 1 },
                        { id: 'testimonial-dot-3', value: 2 }
                      ].map((dot) => (
                        <Box
                          key={dot.id}
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            mx: 0.5,
                            cursor: 'pointer',
                            backgroundColor: dot.value === activeTestimonialSlide ? RED_COLOR : 'rgba(255,255,255,0.3)',
                            transition: 'background-color 0.3s',
                          }}
                          onClick={() => setActiveTestimonialSlide(dot.value)}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </motion.div>
            </Container>
          </Box>

          {/* CTA Section */}
          <Container maxWidth="lg" sx={{ py: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Box 
                sx={{ 
                  bgcolor: 'rgba(222, 31, 39, 0.1)', 
                  p: { xs: 3, md: 6 },
                  borderRadius: { xs: 3, md: 4 },
                  textAlign: 'center',
                  border: '1px solid rgba(222, 31, 39, 0.2)'
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    mb: { xs: 1, md: 2 },
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: '"Oswald", sans-serif',
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }
                  }}
                >
                  Ready to Get Started?
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: { xs: 3, md: 4 },
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: '700px',
                    mx: 'auto',
                    fontFamily: '"Mulish", sans-serif',
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '16px' },
                    lineHeight: { xs: 1.5, md: '29px' },
                    fontWeight: 400
                  }}
                >
                  Contact us today to discuss your logistics needs and get a customized solution for your business.
                </Typography>
                <Button 
                  onClick={() => handleNavigation('/instant-quote')}
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: RED_COLOR, 
                    color: 'white',
                    textTransform: 'none',
                    fontFamily: '"Mulish", sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    borderRadius: '50px',
                    px: 3,
                    py: 1,
                    minWidth: '130px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      bgcolor: '#c41922',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                    }
                  }}
                >
                  Get&nbsp;a&nbsp;Quote
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Add padding at the bottom for mobile to prevent content from being hidden under bottom navigation */}
        {isMobile && <Box sx={{ height: '70px' }} />}
      </ContentSection>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            backgroundColor: DARKER_BG,
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
                  fontFamily: '"Mulish", sans-serif', 
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
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
              }}
            >
              <ListItemText 
                primary="Services" 
                primaryTypographyProps={{ 
                  fontFamily: '"Mulish", sans-serif', 
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
                handleNavigation('/about-us');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="About Us" 
                primaryTypographyProps={{ 
                  fontFamily: '"Mulish", sans-serif', 
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
                  fontFamily: '"Mulish", sans-serif', 
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
                  fontFamily: '"Mulish", sans-serif', 
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
                  fontFamily: '"Mulish", sans-serif', 
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
              fontFamily: '"Mulish", sans-serif',
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
    </PageWrapper>
    </PageTransition>
  );
};

export default ServicesPage;