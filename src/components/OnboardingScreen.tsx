import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const OnboardingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  overflow: 'hidden',
  padding: theme.spacing(2),
  transition: 'background-color 0.5s ease'
}));

const SlideContainer = styled(motion.div)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  textAlign: 'center',
  maxWidth: '100%',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '90%',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '500px',
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '150%',
    height: '100vh', // Increased from 70vh to 80vh for even larger mobile view
    marginBottom: theme.spacing(1), // Reduced bottom margin further
    padding: theme.spacing(0.2), // Reduced padding to maximize image size
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '700px',
    height: '550px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '800px',
    height: '600px',
  },
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center', // Center the button
  padding: theme.spacing(0, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
    bottom: theme.spacing(3),
  },
}));

const IndicatorContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const Indicator = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: active ? '#DE1F27' : 'rgba(255, 255, 255, 0.3)',
  margin: '0 5px',
  transition: 'background-color 0.3s ease',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px', // Google button has slight rounding but not too much
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.16)',
  transition: 'all 0.2s ease',
  border: '1px solid #dadce0', // Exact Google button border color
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px', // Fixed height like Google button
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 32px)', // Almost full width in mobile, accounting for padding
    maxWidth: '400px', // Maximum width to maintain button aesthetics
  },
  '&:hover': {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.24)',
    backgroundColor: '#f8f9fa', // Light hover effect for white button
  },
}));

interface OnboardingSlide {
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const slides: OnboardingSlide[] = [
  {
    image: '/1 motex.png',
    title: 'Book Transport in Seconds',
    description: 'From parcels to premium rides — get started effortlessly.',
    backgroundColor: '#FFF8E1' // Light yellow/cream color
  },
  {
    image: '/2 motex.png',
    title: 'Track Every Booking',
    description: 'Stay informed with real-time updates and booking status',
    backgroundColor: '#FFECEF' // Light pink color
  },
  {
    image: '/3 motex.png',
    title: 'We\'re With You Every Step',
    description: 'Transparent communication and real-time booking updates.',
    backgroundColor: '#E8F5E9' // Light mint green color
  }
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    // Wait for exit animation to complete
    setTimeout(onComplete, 500);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const [slideDirection, setSlideDirection] = useState(1);

  useEffect(() => {
    // Store the previous slide to determine direction
    const prevSlide = currentSlide - slideDirection;
    // If we're going forward, set direction to 1, otherwise -1
    setSlideDirection(currentSlide > prevSlide ? 1 : -1);
  }, [currentSlide]);

  return (
    <AnimatePresence>
      {isVisible && (
        <OnboardingContainer sx={{ backgroundColor: slides[currentSlide].backgroundColor }}>
          <AnimatePresence custom={slideDirection} mode="wait">
            <SlideContainer
              key={currentSlide}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <ImageContainer>
                <Box
                  component="img"
                  src={slides[currentSlide].image}
                  alt={`Onboarding slide ${currentSlide + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </ImageContainer>
              
              <Typography 
                variant="h4" 
                component="h1" 
                color="#333333" 
                fontWeight="bold"
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.25rem' },
                  mt: { xs: -2, sm: 0 } // Move text up on mobile
                }}
              >
                {slides[currentSlide].title}
              </Typography>
              
              <Typography 
                variant="body1" 
                color="#555555" 
                sx={{ 
                  maxWidth: { xs: '90%', sm: '80%' }, // Wider on mobile for better readability
                  mb: { xs: 2, sm: 4 }, // Less margin on mobile
                  fontSize: { xs: '1.1rem', sm: '1.1rem' },
                  px: 2 // Add some padding on the sides
                }}
              >
                {slides[currentSlide].description}
              </Typography>

              <IndicatorContainer>
                {slides.map((_, index) => (
                  <Indicator key={index} active={index === currentSlide} />
                ))}
              </IndicatorContainer>
            </SlideContainer>
          </AnimatePresence>

          <ControlsContainer>
            <StyledButton
              variant="contained"
              onClick={currentSlide < slides.length - 1 ? handleNext : handleComplete}
              sx={{
                backgroundColor: '#ffffff',
                color: 'rgba(0, 0, 0, 0.87)',
                borderRadius: '50px',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                fontSize: '15px',
                px: 3.5,
                py: 1.25,
                minWidth: '140px',
                whiteSpace: 'nowrap',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                border: 'none',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                },
              }}
            >
              {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
              <Box 
                component="span" 
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  ml: 0.5,
                  fontSize: '1rem'
                }}
              >
                →
              </Box>
            </StyledButton>
          </ControlsContainer>
        </OnboardingContainer>
      )}
    </AnimatePresence>
  );
};

export default OnboardingScreen;