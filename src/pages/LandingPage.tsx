// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SplashScreen from '../components/SplashScreen';
import GlobalStyles from '@mui/material/GlobalStyles';
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
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Modal,
  Fade,
  Backdrop,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextareaAutosize,
  InputAdornment
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { 
  LocalShipping as LocalShippingIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  Speed as SpeedIcon,
  Public as PublicIcon,
  Inventory as InventoryIcon,
  Apartment as ApartmentIcon,
  EventAvailable as EventAvailableIcon,
  Business as BusinessIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  PhotoLibrary as PhotoLibraryIcon,
  ContactSupport as ContactSupportIcon,
  RequestQuote as RequestQuoteIcon,
  ArrowForward as ArrowForwardIcon,
  Search as SearchIcon
} from '@mui/icons-material';

import { motion, AnimatePresence, useInView } from 'framer-motion';

// Import fonts
// Mulish font is loaded via Google Fonts in embedded code

// Define color constants at the top of the file
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992'; 
const CARD_BG_COLOR = "rgba(0, 0, 0, 0.8)";

// Define font constants
const HEADING_FONT = '"Mulish", sans-serif';
const BODY_FONT = '"Mulish", sans-serif';

const GradientBackground = styled(Box)(({ theme }) => ({
  background: '#000000',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
    '& .service-title': {
      color: RED_COLOR,
    }
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
  }
}));

const CircleBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  opacity: 0.3, // Increased opacity from 0.15 to 0.3
  background: 'radial-gradient(circle, rgba(222, 31, 39, 0.8) 0%, rgba(0,0,0,0) 70%)', // Increased color intensity
  zIndex: 0,
  filter: 'blur(20px)', // Added blur effect to make it more visible
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  background: '#000000',
  padding: theme.spacing(4, 0),
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
  }
}));

// Add this new styled component for the testimonials section
const TestimonialSection = styled(Box)(({ theme }) => ({
  background: '#000000',
  padding: theme.spacing(8, 0),
  color: 'white',
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

// Add this new styled component for the decorative line
const DecorativeLine = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '2px',
  width: '100%',
  background: '#000000',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  }
}));

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

// Add mouse follower gradient effect from ServicesPage.tsx
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

// Add this new type definition after the existing types
type ServiceItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
};

// Add this new component before the LandingPage component
const MobileServiceCarousel = ({ onServiceClick }: { onServiceClick: (serviceTitle: string) => void }) => {
  const [activeSet, setActiveSet] = useState(0);
  
  const services: ServiceItem[][] = [
    [
      { id: 'parcel', icon: <LocalShippingIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Parcel Delivery' },
      { id: 'transport', icon: <BusinessIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Fragile Freight' },
      { id: 'packers', icon: <InventoryIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Interstate Delivery' },
    ],
    [
      { id: 'courier', icon: <PublicIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Door to Door Service' },
      { id: 'sameday', icon: <SpeedIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Same Day Delivery' },
      { id: 'chauffeur', icon: <ApartmentIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Chauffeur' },
    ],
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSet((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSet}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Grid container spacing={2} justifyContent="center" sx={{ py: 1 }}>
          {services[activeSet].map((service, index) => (
            <Grid 
              key={service.id} 
              item 
              xs={4}
              sx={{ 
                textAlign: 'center',
                p: 0.5
              }}
            >
              <Box
                onClick={() => onServiceClick(service.title)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 1.5,
                  px: 0.5,
                  width: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    '& .service-icon-bg': {
                      bgcolor: 'rgba(222, 31, 39, 0.15)',
                    },
                    '& .service-text': {
                      color: RED_COLOR,
                    }
                  }
                }}
              >
                <Box
                  className="service-icon-bg"
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: 'rgba(222, 31, 39, 0.08)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 1,
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  {service.icon}
                </Box>
                <Typography
                  className="service-text"
                  align="center"
                  sx={{
                    color: 'white',
                    fontFamily: BODY_FONT,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    width: '100%',
                    transition: 'color 0.3s ease',
                    mt: 0.5
                  }}
                >
                  {service.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {/* Dots indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          {[0, 1].map((dot) => (
            <Box
              key={`dot-${dot}`}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                mx: 0.5,
                cursor: 'pointer',
                backgroundColor: dot === activeSet ? RED_COLOR : 'rgba(255,255,255,0.3)',
                transition: 'background-color 0.3s',
              }}
              onClick={() => setActiveSet(dot)}
            />
          ))}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

// Style for the quote form modal
const QuoteFormModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const QuoteModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#0A0A0A',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  padding: theme.spacing(4),
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflow: 'auto',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:focus': {
    outline: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// QuoteBar styled component
const QuoteBar = styled(Box)(({ theme }) => ({
  backgroundColor: 'black',
  borderRadius: '50px',
  padding: theme.spacing(1.5, 2),
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto',
  zIndex: 15,
  position: 'absolute',
  top: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1, 1.5),
    width: '95%',
    top: 15
  },
  [theme.breakpoints.up('sm')]: {
    top: 30
  },
  [theme.breakpoints.up('md')]: {
    top: 40
  }
}));

const LandingPage = () => {
  const handleServiceClick = (serviceTitle: string) => {
    // Navigate to the instant quote page with the selected service
    navigate('/instant-quote', { state: { selectedService: serviceTitle } });
    window.scrollTo(0, 0);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Add mouse position state for gradient light effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const movingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Group services into slides of 3
  const slidesCount = 3; // Now 3 slides
  
  // Define the service card type
  type ServiceCard = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  // Define the slide type
  type Slide = {
    id: string;
    services: ServiceCard[];
  };
  
  // Service cards data
  const serviceCards: ServiceCard[] = [
    {
      id: 'parcel-delivery',
      title: "Parcel Delivery",
      description: "Fast and secure parcel delivery solutions for businesses and individuals. We ensure your packages arrive safely and on schedule.",
      image: "/services-15.jpg",
    },
    {
      id: 'fragile-freight',
      title: "Fragile Freight",
      description: "Specialized handling for delicate and valuable items. Our experts use proper techniques and materials to protect your fragile shipments.",
      image: "/gallery 6.jpeg",
    },
    {
      id: 'chauffeur-services',
      title: "Chauffeur Services",
      description: "Professional chauffeur services with experienced drivers. We provide reliable transportation for executives, special events, and VIP clients.",
      image: "/chauffeur-2.jpg",
    },
    {
      id: 'door-to-door',
      title: "Door to Door Service",
      description: "Convenient pickup and delivery directly from your location to the destination. Let us handle the logistics while you focus on your business.",
      image: "/gallery 2.jpg",
    },
    {
      id: 'same-day-delivery',
      title: "Same Day Delivery",
      description: "Urgent deliveries handled with speed and reliability. Our same-day service ensures your time-sensitive packages reach their destination promptly.",
      image: "/gallery 3.jpg",
    },
    {
      id: 'interstate-delivery',
      title: "Interstate Delivery",
      description: "Seamless interstate logistics solutions connecting businesses across Australia. Our fleet ensures safe and timely delivery across state lines.",
      image: "/upscalemedia-transformed.jpeg",
    }
  ];
  
  // Create slides array - split services into groups of 2
  const slides: Slide[] = [
    {
      id: 'first-slide',
      services: serviceCards.slice(0, 2)
    },
    {
      id: 'second-slide',
      services: serviceCards.slice(2, 4)
    },
    {
      id: 'third-slide',
      services: serviceCards.slice(4, 6)
    }
  ];
  
  // Create desktop slides array - split services into groups of 3
  const desktopSlides: Slide[] = [
    {
      id: 'desktop-first-slide',
      services: serviceCards.slice(0, 3)
    },
    {
      id: 'desktop-second-slide',
      services: serviceCards.slice(3, 6)
    }
  ];
  
  const maxActiveSlide = slidesCount - 1;
  const desktopSlidesCount = desktopSlides.length;
  
  const handleNextSlide = useCallback(() => {
    if (isMobile) {
      setActiveSlide(prev => (prev === maxActiveSlide ? 0 : prev + 1));
    } else {
      setActiveSlide(prev => (prev === desktopSlidesCount - 1 ? 0 : prev + 1));
    }
  }, [maxActiveSlide, desktopSlidesCount, isMobile]);
  
  // Setup auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [handleNextSlide]); // Include handleNextSlide since it's used in the effect

  // Handle swipe/trackpad gestures
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
      e.preventDefault();
    }
    setCurrentTranslate(activeSlide * -100);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    let currentX: number;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = (currentX - startX) / (carouselRef.current?.clientWidth || 1) * 100;
    const newTranslate = currentTranslate + diff;
    
    // Apply boundaries - don't allow dragging beyond first or last slide
    if (newTranslate > 0) {
      return;
    }
    
    if (newTranslate < -maxActiveSlide * 100) {
      return;
    }
    
    carouselRef.current?.style.setProperty('transform', `translateX(${newTranslate}%)`);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false);
    
    // Calculate the final position to snap to
    const carouselWidth = carouselRef.current?.offsetWidth || 0;
    const pxPerSlide = carouselWidth;
    const dragged = currentTranslate - (-activeSlide * pxPerSlide);
    const threshold = pxPerSlide * 0.2;
    
    if (dragged > threshold) {
      // Dragged right enough to go to previous slide
      setActiveSlide(Math.max(0, activeSlide - 1));
    } else if (dragged < -threshold) {
      // Dragged left enough to go to next slide
      setActiveSlide(Math.min(slidesCount - 1, activeSlide + 1));
    } else {
      // Not dragged enough, snap back
      setActiveSlide(activeSlide);
    }
  };

  // Reset transition on slide change
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = isDragging ? 'none' : 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${activeSlide * 100}%)`;
    }
  }, [activeSlide, isDragging]);

  const [showSplash, setShowSplash] = useState(() => {
    // Check if this is the first visit in the current session
    return !sessionStorage.getItem('hasVisited');
  });

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Mark that the user has visited in this session
    sessionStorage.setItem('hasVisited', 'true');
  };

  // Function to handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Add useEffect for mouse tracking only on desktop devices
  useEffect(() => {
    // Skip mouse tracking on mobile to improve performance
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to optimize performance
      requestAnimationFrame(() => {
        setMousePos({ 
          x: e.clientX, 
          y: e.clientY 
        });
        
        setIsMoving(true);
        
        if (movingTimeout.current) {
          clearTimeout(movingTimeout.current);
        }
        
        movingTimeout.current = setTimeout(() => {
          setIsMoving(false);
        }, 150);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movingTimeout.current) {
        clearTimeout(movingTimeout.current);
      }
    };
  }, [isMobile]);

  // Handle next offer slide as a no-op since we've removed activeOfferSlide
  const handleNextOfferSlide = useCallback(() => {
    // This is kept as an empty function since it's referenced elsewhere
    // but all related functionality is being removed
  }, []);

  // Setup auto-scroll effect for offer carousel with mobile optimization
  useEffect(() => {
    // Skip automatic animation on mobile to improve performance
    if (isMobile) return;
    
    const interval = setInterval(() => {
      handleNextOfferSlide();
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(interval);
  }, [handleNextOfferSlide, isMobile]);
  
  // In the LandingPage component, add a new state variable
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);

  // Add a new function for handling testimonial slide changes
  const handleNextTestimonialSlide = useCallback(() => {
    setActiveTestimonialSlide((prev: number) => (prev === 2 ? 0 : prev + 1));
  }, []);

  // Set up auto-scroll for testimonials with mobile optimization
  useEffect(() => {
    // Use longer intervals on mobile to reduce CPU usage
    const intervalTime = isMobile ? 12000 : 8000;
    
    const interval = setInterval(() => {
      handleNextTestimonialSlide();
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [handleNextTestimonialSlide, isMobile]);

  const [bottomNavValue, setBottomNavValue] = useState(0);

  // Form states
  const [pickupSuburb, setPickupSuburb] = useState('');
  const [deliverySuburb, setDeliverySuburb] = useState('');
  const [quoteDate, setQuoteDate] = useState<Dayjs | null>(dayjs());
  const [quoteTime, setQuoteTime] = useState<Dayjs | null>(dayjs());
  const [openQuoteForm, setOpenQuoteForm] = useState(false);
  
  // Full form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [goodsDescription, setGoodsDescription] = useState('');
  const [service, setService] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [pickupAccess, setPickupAccess] = useState('ground');
  const [deliveryAccess, setDeliveryAccess] = useState('ground');
  const [fragile, setFragile] = useState('no');
  const [otherInfo, setOtherInfo] = useState('');
  
  // Handle quote form open/close
  const handleOpenQuoteForm = () => {
    setOpenQuoteForm(true);
  };
  
  const handleCloseQuoteForm = () => {
    setOpenQuoteForm(false);
  };
  
  // Handle form submission
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the form data
    console.log({
      firstName,
      lastName,
      email,
      pickupSuburb,
      deliverySuburb,
      quoteDate,
      quoteTime,
      goodsDescription,
      service,
      dimensions,
      pickupAccess,
      deliveryAccess,
      fragile,
      otherInfo
    });
    
    // Close the form and maybe show a success message
    handleCloseQuoteForm();
    // Could navigate to quote success page or show success modal
  };

  // Return early if showing splash screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <GradientBackground>
        {/* Add GlobalStyles for animations */}
        <GlobalStyles
          styles={{
            '@keyframes slideLogos': {
              '0%': {
                transform: 'translateX(0)',
              },
              '100%': {
                transform: 'translateX(-50%)',
              },
            },
            '@keyframes moveLeft': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-150px)' },
            },
            '@keyframes moveRight': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(150px)' },
            },
            '@keyframes pulse': {
              '0%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
              '50%': { opacity: 0.25, transform: 'translate(-50%, -50%) scale(1.3)' },
              '100%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
            },
            '@keyframes buttonShine': {
              '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
              '20%, 100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
            },
            '@keyframes shine': {
              '0%': { left: '-100%' },
              '20%, 100%': { left: '100%' }
            },
            '@keyframes ripple': {
              '0%': { transform: 'scale(0.8)', opacity: 0.3 },
              '50%': { transform: 'scale(1)', opacity: 0.5 },
              '100%': { transform: 'scale(0.8)', opacity: 0.3 },
            },
          }}
        />
        
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ 
          py: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.85)', 
          backdropFilter: 'blur(8px)', 
          zIndex: 1100,
          display: isMobile ? 'none' : 'flex' // Hide AppBar on mobile
        }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Keep existing AppBar content */}
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
                      color: RED_COLOR, 
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
                  component="button" 
                  onClick={() => handleNavigation('/instant-quote')} 
                  variant="contained" 
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
        
        {/* Toolbar spacer to prevent content from being hidden under fixed AppBar - only for desktop */}
        {!isMobile && <Box sx={{ height: '64px' }} />}
        
        {/* Update the Hero section with quote form */}
        <Box 
          sx={{ 
            backgroundImage: 'url("/PHOTO-2025-03-22-21-36-54_1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: { xs: '35vh', sm: '40vh', md: '55vh' },
            overflow: 'hidden',
            zIndex: 10,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              zIndex: 1
            }
          }}
        >
          {/* Quote Bar Form - Updated with black background and red accents */}
          <QuoteBar>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={4.5} sm={5} md={4.5}>
                  <TextField
                    fullWidth
                    placeholder="Pickup suburb"
                    variant="standard"
                    value={pickupSuburb}
                    onChange={(e) => setPickupSuburb(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: isMobile ? null : (
                        <InputAdornment position="start">
                          <LocationIcon sx={{ color: RED_COLOR, fontSize: { xs: 18, sm: 20 } }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiInput-root': {
                        padding: { xs: '4px 8px', sm: '8px 12px' },
                        fontSize: { xs: '0.85rem', sm: 'inherit' },
                        borderRadius: '30px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${RED_COLOR}25`,
                        color: 'white',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4.5} sm={5} md={4.5}>
                  <TextField
                    fullWidth
                    placeholder="Delivery suburb"
                    variant="standard"
                    value={deliverySuburb}
                    onChange={(e) => setDeliverySuburb(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: isMobile ? null : (
                        <InputAdornment position="start">
                          <LocationIcon sx={{ color: RED_COLOR, fontSize: { xs: 18, sm: 20 } }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiInput-root': {
                        padding: { xs: '4px 8px', sm: '8px 12px' },
                        fontSize: { xs: '0.85rem', sm: 'inherit' },
                        borderRadius: '30px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${RED_COLOR}25`,
                        color: 'white',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={0} sm={0} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <DatePicker
                    value={quoteDate}
                    onChange={(newDate) => setQuoteDate(newDate)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "standard",
                        InputProps: {
                          disableUnderline: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventAvailableIcon sx={{ color: RED_COLOR, fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        },
                        sx: {
                          '& .MuiInput-root': {
                            padding: '8px 12px',
                            borderRadius: '30px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${RED_COLOR}25`,
                            color: 'white',
                          },
                          '& .MuiSvgIcon-root': {
                            color: 'white',
                          },
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={1.5} sm={1} md={0} sx={{ display: { xs: 'block', md: 'none' } }}>
                  <IconButton
                    onClick={() => {
                      // Show date picker modal for mobile
                      const dateInput = document.createElement('input');
                      dateInput.type = 'date';
                      dateInput.style.position = 'absolute';
                      dateInput.style.opacity = '0';
                      dateInput.style.height = '0';
                      dateInput.style.width = '0';
                      dateInput.style.zIndex = '-1';
                      
                      // Set default date to today formatted as YYYY-MM-DD
                      const today = new Date();
                      const year = today.getFullYear();
                      const month = String(today.getMonth() + 1).padStart(2, '0');
                      const day = String(today.getDate()).padStart(2, '0');
                      dateInput.defaultValue = `${year}-${month}-${day}`;
                      
                      // Add to DOM, trigger click, and handle the change
                      document.body.appendChild(dateInput);
                      dateInput.click();
                      
                      dateInput.addEventListener('change', (e) => {
                        const target = e.target as HTMLInputElement;
                        const selectedDate = new Date(target.value);
                        setQuoteDate(dayjs(selectedDate));
                        document.body.removeChild(dateInput);
                      });
                      
                      // Remove if closed without selection
                      dateInput.addEventListener('blur', () => {
                        if (document.body.contains(dateInput)) {
                          document.body.removeChild(dateInput);
                        }
                      });
                    }}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      color: RED_COLOR,
                      width: { xs: '32px', sm: '36px' },
                      height: { xs: '32px', sm: '36px' },
                      border: `1px solid ${RED_COLOR}25`,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    aria-label="Select Date"
                  >
                    <EventAvailableIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid item xs={1.5} sm={1} md={1}>
                  <IconButton
                    onClick={handleOpenQuoteForm}
                    sx={{
                      bgcolor: RED_COLOR,
                      color: 'white',
                      width: { xs: '32px', sm: '36px', md: '44px' },
                      height: { xs: '32px', sm: '36px', md: '44px' },
                      '&:hover': {
                        bgcolor: '#c41922',
                      },
                    }}
                    aria-label="Get Quote"
                  >
                    <SearchIcon fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </QuoteBar>
          
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Empty container for spacing */}
          </Container>
        </Box>

        {/* Service Categories Section */}
        <Box sx={{ position: 'relative', my: 6, zIndex: 5 }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' },
                fontWeight: 700,
                mb: { xs: 2, sm: 3, md: 4 },
                color: 'white',
                fontFamily: HEADING_FONT
              }}
            >
              OUR SERVICES
            </Typography>
            
            <Grid container spacing={3}>
              {serviceCards.map((service) => (
                <Grid item xs={4} sm={6} md={4} key={service.id}>
                  <ServiceCard 
                    onClick={() => handleServiceClick(service.title)}
                    sx={{ 
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={service.image}
                      alt={service.title}
                      sx={{ 
                        height: { xs: 100, sm: 180, md: 200 },
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <Box sx={{ 
                      p: { xs: 1, sm: 2 },
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Typography 
                        className="service-title"
                        variant="h6" 
                        sx={{ 
                          color: 'white',
                          fontFamily: HEADING_FONT,
                          fontWeight: 600,
                          mb: { xs: 0, sm: 1 },
                          fontSize: { xs: '0.8rem', sm: '1rem', md: '1.25rem' }
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.8)',
                          display: { xs: 'none', sm: 'block' },
                          fontFamily: BODY_FONT,
                          fontSize: '0.85rem',
                          mb: 0
                        }}
                      >
                        {service.description.length > 70 ? service.description.substring(0, 70) + '...' : service.description}
                      </Typography>
                    </Box>
                  </ServiceCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Detailed Quote Form Modal */}
        <QuoteFormModal
          open={openQuoteForm}
          onClose={handleCloseQuoteForm}
          closeAfterTransition
          slots={{
            backdrop: Backdrop,
          }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openQuoteForm}>
            <QuoteModalContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ color: 'white', fontFamily: HEADING_FONT, fontWeight: 600 }}>
                  Complete Your Quote Request
                </Typography>
                <IconButton onClick={handleCloseQuoteForm} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <Box component="form" onSubmit={handleQuoteSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  {/* Personal Information */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      variant="filled"
                sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiFilledInput-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      variant="filled"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiFilledInput-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="filled"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiFilledInput-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  
                  {/* Shipment Details */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Description of Goods"
                      value={goodsDescription}
                      onChange={(e) => setGoodsDescription(e.target.value)}
                      variant="filled"
                      placeholder="Please describe what you need transported"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiFilledInput-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="filled" fullWidth sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      '& .MuiFilledInput-root': {
                        borderRadius: '8px',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiFilledInput-input': {
                        color: 'white',
                      },
                      '& .MuiSelect-icon': {
                        color: 'white',
                      },
                    }}>
                      <InputLabel>Service</InputLabel>
                      <Select
                        value={service}
                        onChange={(e) => setService(e.target.value as string)}
                      >
                        <MenuItem value="parcel">Parcel Delivery</MenuItem>
                        <MenuItem value="fragile">Fragile Freight</MenuItem>
                        <MenuItem value="chauffeur">Chauffeur Services</MenuItem>
                        <MenuItem value="doorToDoor">Door to Door Service</MenuItem>
                        <MenuItem value="sameDay">Same Day Delivery</MenuItem>
                        <MenuItem value="interstate">Interstate Delivery</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {/* Dimensions */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 1, fontFamily: BODY_FONT }}>
                      Dimensions (cm)
              </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Length"
                          value={dimensions.length}
                          onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
                          variant="filled"
                          InputProps={{
                            endAdornment: <InputAdornment position="end" sx={{ color: 'white' }}>cm</InputAdornment>,
                          }}
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            '& .MuiFilledInput-root': { borderRadius: '8px' },
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiFilledInput-input': { color: 'white' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Width"
                          value={dimensions.width}
                          onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                          variant="filled"
                          InputProps={{
                            endAdornment: <InputAdornment position="end" sx={{ color: 'white' }}>cm</InputAdornment>,
                          }}
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            '& .MuiFilledInput-root': { borderRadius: '8px' },
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiFilledInput-input': { color: 'white' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Height"
                          value={dimensions.height}
                          onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                          variant="filled"
                          InputProps={{
                            endAdornment: <InputAdornment position="end" sx={{ color: 'white' }}>cm</InputAdornment>,
                          }}
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            '& .MuiFilledInput-root': { borderRadius: '8px' },
                            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                            '& .MuiFilledInput-input': { color: 'white' },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  {/* Access Options */}
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                      <FormLabel component="legend" sx={{ color: 'white', fontFamily: BODY_FONT }}>Pickup Access</FormLabel>
                      <RadioGroup
                        row
                        value={pickupAccess}
                        onChange={(e) => setPickupAccess(e.target.value)}
                      >
                        <FormControlLabel 
                          value="ground" 
                          control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#6B46C1' } }} />} 
                          label="Ground Floor" 
                          sx={{ color: 'white' }}
                        />
                        <FormControlLabel 
                          value="stairs" 
                          control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#6B46C1' } }} />} 
                          label="Stairs" 
                          sx={{ color: 'white' }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                      <FormLabel component="legend" sx={{ color: 'white', fontFamily: BODY_FONT }}>Delivery Access</FormLabel>
                      <RadioGroup
                        row
                        value={deliveryAccess}
                        onChange={(e) => setDeliveryAccess(e.target.value)}
                      >
                        <FormControlLabel 
                          value="ground" 
                          control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#6B46C1' } }} />} 
                          label="Ground Floor" 
                          sx={{ color: 'white' }}
                        />
                        <FormControlLabel 
                          value="stairs" 
                          control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#6B46C1' } }} />} 
                          label="Stairs" 
                          sx={{ color: 'white' }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  
                  {/* Fragile */}
                  <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                      <FormLabel component="legend" sx={{ color: 'white', fontFamily: BODY_FONT }}>Fragile Items?</FormLabel>
                      <RadioGroup
                        row
                        value={fragile}
                        onChange={(e) => setFragile(e.target.value)}
                      >
                        <FormControlLabel 
                          value="yes" 
                          control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#6B46C1' } }} />} 
                          label="Yes" 
                          sx={{ color: 'white' }}
                        />
                        <FormControlLabel 
                          value="no" 
                          control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: '#6B46C1' } }} />} 
                          label="No" 
                          sx={{ color: 'white' }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  
                  {/* Other Info */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Other Information"
                      value={otherInfo}
                      onChange={(e) => setOtherInfo(e.target.value)}
                      variant="filled"
                      placeholder="Any additional details or special requirements"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        '& .MuiFilledInput-root': {
                          borderRadius: '8px',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiFilledInput-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  
                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        py: 1.5,
                        bgcolor: '#6B46C1',
                        color: 'white',
                        textTransform: 'none',
                        fontFamily: BODY_FONT,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        borderRadius: '8px',
                        '&:hover': {
                          bgcolor: '#553C9A',
                        },
                      }}
                    >
                      Submit Quote Request
                    </Button>
                  </Grid>
                </Grid>
        </Box>
            </QuoteModalContent>
          </Fade>
        </QuoteFormModal>

        

          {/* Decorative Line */}
          <DecorativeLine />

          <LogoContainer>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ 
                color: 'white',
                mb: { xs: 2, md: 4 }, 
                letterSpacing: 1, 
                fontWeight: 800,
                fontFamily: HEADING_FONT,
                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }
              }}>
                TRUSTED BY
              </Typography>
              
              
              <Box className="logo-slide-container">
                <Box className="logo-slide">
                  {[
                    { src: "/Sydney+Visitor+Centre_Small.png", alt: "Sydney Visitor Centre", id: "svc-1" },
                    { src: "/motex-transport-hunter-valley-wedding-planner.png", alt: "Hunter Valley Wedding Planner", id: "hvwp-1" },
                    { src: "/motex-transport-cwci-logo.png", alt: "CWCI", id: "cwci-1" },
                    { src: "/Sydney+Visitor+Centre_Small.png", alt: "Sydney Visitor Centre", id: "svc-2" },
                    { src: "/motex-transport-hunter-valley-wedding-planner.png", alt: "Hunter Valley Wedding Planner", id: "hvwp-2" },
                    { src: "/motex-transport-cwci-logo.png", alt: "CWCI", id: "cwci-2" }
                  ].map((logo) => (
                    <Box 
                      key={logo.id}
                      component="img" 
                      src={logo.src} 
                      alt={logo.alt}
                      sx={{
                        height: { xs: '40px', sm: '50px', md: '60px' },
                        mx: { xs: 3, sm: 4, md: 6 },
                        opacity: 1,
                        transition: 'transform 0.3s',
                        filter: 'brightness(1)',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Container>
          </LogoContainer>

          {/* Decorative Line */}
          <DecorativeLine />

          {/* Testimonials Section */}
          <TestimonialSection>
            <Container maxWidth="lg">
              <Typography variant="h2" align="center" sx={{ 
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '3.5rem' },
                fontWeight: 700,
                mb: { xs: 3, md: 6 },
                color: 'white',
                fontFamily: HEADING_FONT,
              }}>
                WHAT OUR CLIENTS SAY ABOUT US
              </Typography>
              
              {/* Desktop view - static grid */}
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Grid container spacing={3}>
                  {/* Hunter Valley Wedding Planner Testimonial */}
                  <Grid item md={6}>
                    <Box sx={{ p: 2 }}>

                      <TestimonialCard>
                        <Box
                          component="img"
                          src="/motex-transport-hunter-valley-wedding-planner.png"
                          alt="Hunter Valley Wedding Planner"
                          sx={{
                            height: { xs: '40px', sm: '60px', md: '80px' },
                            mb: { xs: 2, md: 4 },
                            display: 'block',
                            filter: 'brightness(1.2)',
                          }}
                        />
                        
                        <Typography variant="body1" sx={{ 
                          mb: 2, 
                          lineHeight: 1.6,
                        fontFamily: BODY_FONT,
                          fontStyle: 'italic',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' },
                          height: { xs: '150px', sm: '200px', md: 'auto' },
                          overflow: { xs: 'auto', md: 'visible' },
                          display: '-webkit-box',
                          WebkitLineClamp: { xs: 10, sm: 'unset' },
                          WebkitBoxOrient: 'vertical'
                        }}>
                          "The service we received from Motex Transport was extremely professional, efficient and cost effective. Roy was an absolute life saver for us, during an extremely busy period for the business. We had multiple delivery drops - one being on a Saturday - and nothing was an issue. We liked that we could communicate directly with the driver, which was extremely reassuring for us when goods needed to be delivered within allocated time slots. He also continued to communicate with us in terms of delivery ETA's and updates. This really saved us sooooo much stress and pressure. We hope to continue to use Motex moving forward. Well done and thank you for your professionalism and wonderful service."
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ 
                        fontFamily: BODY_FONT,
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' }
                        }}>
                          - Natalie, <Box component="a" href="https://huntervalleyweddingplanner.com.au/" target="_blank" rel="noopener" sx={{ color: '#c6b47a', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hunter Valley Wedding Planner</Box>
                        </Typography>
                      </TestimonialCard>
                    </Box>
                  </Grid>
                  
                  {/* CWCI Australia Testimonial */}
                  <Grid item md={6}>
                    <Box sx={{ p: 2 }}>

                      <TestimonialCard>
                        <Box
                          component="img"
                          src="/motex-transport-cwci-logo.png"
                          alt="CWCI Australia"
                          sx={{
                            height: { xs: '40px', sm: '60px', md: '80px' },
                            mb: { xs: 2, md: 4 },
                            display: 'block',
                            filter: 'brightness(1.2)',
                          }}
                        />
                        
                        <Typography variant="body1" sx={{ 
                          mb: 2, 
                          lineHeight: 1.6,
                        fontFamily: BODY_FONT,
                          fontStyle: 'italic',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                          height: { xs: '200px', sm: '250px', md: 'auto' },
                          overflow: { xs: 'hidden', md: 'visible' }
                        }}>
                          "Our premises are a challenge for deliveries with stairs and uneven surfaces, however Roy (Motex) has for many years delivered boxes to us with efficiency, care and cheerfulness. This makes a huge difference as we are a small staff yet often have deliveries varying from 5 - 30 boxes at different times of the year. This enables us to function well and always be on top of stock and supply. I would highly recommend Motex Transport to any size or type of business - you won't be disappointed!"
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ 
                        fontFamily: BODY_FONT,
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' }
                        }}>
                          - Christine, <Box component="a" href="https://cwciaus.org.au/" target="_blank" rel="noopener" sx={{ color: '#9b3dba', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>CWCI Australia</Box>
                        </Typography>
                      </TestimonialCard>
                    </Box>
                  </Grid>
                  
                  {/* Sydney Visitor Centre Testimonial */}
                  <Grid item md={12}>
                    <Box sx={{ p: 2, maxWidth: '800px', mx: 'auto' }}>

                      <TestimonialCard sx={{ textAlign: 'center' }}>
                        <Box
                          component="img"
                          src="/Sydney+Visitor+Centre_Small.png"
                          alt="Sydney Visitor Centre"
                          sx={{
                            height: { xs: '40px', sm: '50px', md: '60px' },
                            mb: { xs: 2, md: 4 },
                            display: 'block',
                            mx: 'auto',
                            filter: 'brightness(1.2)',
                          }}
                        />
                        
                        <Typography variant="body1" sx={{ 
                          mb: 2, 
                          lineHeight: 1.6,
                        fontFamily: BODY_FONT,
                          fontStyle: 'italic',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                          maxWidth: '800px',
                          mx: 'auto'
                        }}>
                          "The Motex Team consistently go that extra mile for the customer. In order to free up the time of our staff on the ground, the Motex team go above and beyond the typical expectations to ensure we as the customer are always put first whilst carrying out the job to an exemplary level. I would highly recommend and endorse Motex as being an excellent company, and we will most certainly continue to use their services."
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ 
                        fontFamily: BODY_FONT,
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' }
                        }}>
                          - Adam, <Box component="a" href="https://visitorcentre.com.au/" target="_blank" rel="noopener" sx={{ color: '#0066b3', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sydney Visitor Centre</Box>
                        </Typography>
                      </TestimonialCard>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Mobile view - carousel */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <CarouselContainer>
                  <CarouselTrack 
                    ref={testimonialCarouselRef}
                    sx={{ 
                      transform: `translateX(-${activeTestimonialSlide * 100}%)`,
                    }}
                  >
                    {/* First Slide - Hunter Valley Wedding Planner */}
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
                        <Box
                          component="img"
                          src="/motex-transport-hunter-valley-wedding-planner.png"
                          alt="Hunter Valley Wedding Planner"
                          sx={{
                            height: { xs: '40px', sm: '60px' },
                            mb: { xs: 2 },
                            display: 'block',
                            filter: 'brightness(1.2)',
                          }}
                        />
                        
                        <Typography variant="body1" sx={{ 
                          mb: 2, 
                          lineHeight: 1.6,
                        fontFamily: BODY_FONT,
                          fontStyle: 'italic',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          maxHeight: '180px',
                          overflow: 'auto'
                        }}>
                          "The service we received from Motex Transport was extremely professional, efficient and cost effective. Roy was an absolute life saver for us, during an extremely busy period for the business. We had multiple delivery drops - one being on a Saturday - and nothing was an issue. We liked that we could communicate directly with the driver, which was extremely reassuring for us when goods needed to be delivered within allocated time slots. He also continued to communicate with us in terms of delivery ETA's and updates. This really saved us sooooo much stress and pressure. We hope to continue to use Motex moving forward. Well done and thank you for your professionalism and wonderful service."
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ 
                        fontFamily: BODY_FONT,
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem' }
                        }}>
                          - Natalie, <Box component="a" href="https://huntervalleyweddingplanner.com.au/" target="_blank" rel="noopener" sx={{ color: '#c6b47a', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hunter Valley Wedding Planner</Box>
                        </Typography>
                      </TestimonialCard>
                    </Box>
                    
                    {/* Second Slide - CWCI Australia */}
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
                        <Box
                          component="img"
                          src="/motex-transport-cwci-logo.png"
                          alt="CWCI Australia"
                          sx={{
                            height: { xs: '40px', sm: '60px' },
                            mb: { xs: 2 },
                            display: 'block',
                            filter: 'brightness(1.2)',
                          }}
                        />
                        
                        <Typography variant="body1" sx={{ 
                          mb: 2, 
                          lineHeight: 1.6,
                        fontFamily: BODY_FONT,
                          fontStyle: 'italic',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem' },
                          maxHeight: '180px',
                          overflow: 'auto'
                        }}>
                          "Our premises are a challenge for deliveries with stairs and uneven surfaces, however Roy (Motex) has for many years delivered boxes to us with efficiency, care and cheerfulness. This makes a huge difference as we are a small staff yet often have deliveries varying from 5 - 30 boxes at different times of the year. This enables us to function well and always be on top of stock and supply. I would highly recommend Motex Transport to any size or type of business - you won't be disappointed!"
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ 
                        fontFamily: BODY_FONT,
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem' }
                        }}>
                          - Christine, <Box component="a" href="https://cwciaus.org.au/" target="_blank" rel="noopener" sx={{ color: '#9b3dba', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>CWCI Australia</Box>
                        </Typography>
                      </TestimonialCard>
                    </Box>
                    
                    {/* Third Slide - Sydney Visitor Centre */}
                    <Box 
                      sx={{ 
                        display: 'flex',
                        width: '100%',
                        flexShrink: 0,
                        justifyContent: 'center',
                        p: { xs: 2 }
                      }}
                    >
                      <TestimonialCard sx={{ width: '100%', textAlign: 'center' }}>
                        <Box
                          component="img"
                          src="/Sydney+Visitor+Centre_Small.png"
                          alt="Sydney Visitor Centre"
                          sx={{
                            height: { xs: '40px', sm: '50px' },
                            mb: { xs: 2 },
                            display: 'block',
                            mx: 'auto',
                            filter: 'brightness(1.2)',
                          }}
                        />
                        
                        <Typography variant="body1" sx={{ 
                          mb: 2, 
                          lineHeight: 1.6,
                        fontFamily: BODY_FONT,
                          fontStyle: 'italic',
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem' },
                          maxHeight: '180px',
                          overflow: 'auto'
                        }}>
                          "The Motex Team consistently go that extra mile for the customer. In order to free up the time of our staff on the ground, the Motex team go above and beyond the typical expectations to ensure we as the customer are always put first whilst carrying out the job to an exemplary level. I would highly recommend and endorse Motex as being an excellent company, and we will most certainly continue to use their services."
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ 
                        fontFamily: BODY_FONT,
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.75rem', sm: '0.85rem' }
                        }}>
                          - Adam, <Box component="a" href="https://visitorcentre.com.au/" target="_blank" rel="noopener" sx={{ color: '#0066b3', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sydney Visitor Centre</Box>
                        </Typography>
                      </TestimonialCard>
                    </Box>
                  </CarouselTrack>
                </CarouselContainer>
                
                {/* Dots indicator for testimonial slides - mobile only */}
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
            </Container>
          </TestimonialSection>
      </GradientBackground>
    </>
  );
};

export default LandingPage;