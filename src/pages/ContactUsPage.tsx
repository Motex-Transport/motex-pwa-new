import { useState, useRef, useEffect } from 'react';
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
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Paper,
  FormHelperText,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  Send as SendIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import emailjs from '@emailjs/browser';

// Define colors
const DARK_BG = '#0A0A0A';
const DARKER_BG = '#050505';
const WHITE_TEXT = '#FFFFFF';
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992';
const INPUT_BG = 'rgba(255, 255, 255, 0.05)';
const ACCENT_COLOR = '#38BDF8';

// Define fonts
const HEADING_FONT = '"Oswald", sans-serif';
const BODY_FONT = '"Mulish", sans-serif';

// Styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  backgroundColor: DARKER_BG,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: DARK_BG,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  color: WHITE_TEXT,
  overflowY: 'auto',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/services-15.jpg")',
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

const StyledTextField = styled(InputBase)(({ theme }) => ({
  backgroundColor: INPUT_BG,
  borderRadius: '4px',
  padding: '12px 16px',
  width: '100%',
  color: WHITE_TEXT,
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:focus-within': {
    border: `1px solid ${ACCENT_COLOR}`,
    boxShadow: `0 0 0 2px ${ACCENT_COLOR}30`,
  },
  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 14px',
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-input': {
      fontSize: '13px',
    }
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: RED_COLOR,
  color: 'white',
  padding: '12px 24px',
  borderRadius: '4px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 500,
  fontFamily: BODY_FONT,
  width: '100%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#c41922',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgba(222, 31, 39, 0.5)',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    padding: '10px 20px',
  }
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  marginBottom: theme.spacing(1),
  fontFamily: BODY_FONT,
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    marginBottom: theme.spacing(0.5),
  }
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    borderRadius: '12px',
    '& .MuiTypography-body1': {
      wordBreak: 'break-word',
    }
  }
}));

const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
}));

const ContactUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("4UoPVi0_UFU0fK2L0");
  }, []);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Form validation
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false
      });
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare customer email parameters
      const customerEmailParams = {
        service_id: 'service_g472qdp',
        template_id: 'template_cce116x',
        user_id: '4UoPVi0_UFU0fK2L0',
        template_params: {
          to_name: formData.name,
          to_email: formData.email,
          from_name: 'MOTEX Transport',
          message: 'Thank you for your message. We will get back to you shortly.',
          phone: formData.phone || 'Not provided',
          subject: formData.subject || 'General Inquiry',
          reply_message: formData.message
        }
      };
      
      // Prepare admin email parameters
      const adminEmailParams = {
        service_id: 'service_g472qdp',
        template_id: 'template_92wv5g9',
        user_id: '4UoPVi0_UFU0fK2L0',
        template_params: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
          submission_time: new Date().toLocaleString()
        }
      };
      
      // Send customer confirmation email
      const customerResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerEmailParams)
      });
      
      if (!customerResponse.ok) {
        throw new Error(`Customer email failed: ${customerResponse.statusText}`);
      }
      
      console.log('Email sent to customer');
      
      // Send admin notification email
      const adminResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminEmailParams)
      });
      
      if (!adminResponse.ok) {
        throw new Error(`Admin email failed: ${adminResponse.statusText}`);
      }
      
      console.log('Email sent to admin');
      
        setLoading(false);
      
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      
        alert('Thank you for your message! We will get back to you soon.');
    } catch (error) {
      console.error('Email error:', error);
        setLoading(false);
      alert('There was an error sending your message. Please try again. Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

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
    <PageWrapper>
      {/* Header - Updated to match landing page */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ py: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1100 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
            <Box 
              component={RouterLink}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none'
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
                  component={RouterLink}
                  to="/" 
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
                  component={RouterLink}
                  to="/services"
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
                  component={RouterLink}
                  to="/about-us"
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
                  component={RouterLink}
                  to="/instant-quote"
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
                  component={RouterLink}
                  to="/gallery"
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
                  component={RouterLink}
                  to="/contact-us"
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
                  Contact
                </Link>
              </Stack>
            </Box>
          )}
          
          {/* Get A Quote button on the right */}
          <Box sx={{ display: 'flex', width: '20%', justifyContent: 'flex-end' }}>
            {!isMobile && (
              <Button 
                component={RouterLink}
                to="/instant-quote"
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
      
      {/* Add toolbar spacer */}
      <Box sx={{ height: '64px' }} />

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
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              align="center"
              sx={{ 
                mb: 1,
                fontWeight: 800, 
                color: RED_COLOR,
                fontFamily: HEADING_FONT,
                fontSize: { xs: '40px', sm: '50px', md: '90px', lg: '100px' }
              }}
            >
              CONTACT US
            </Typography>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Main Content */}
      <ContentSection>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Contact Form Section */}
            <Grid item xs={12} md={7}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: { xs: 2, md: 4 }, 
                      fontFamily: HEADING_FONT,
                      fontWeight: 700,
                      fontSize: { xs: '24px', sm: '28px', md: '36px' }
                    }}
                  >
                    SEND US A MESSAGE
                  </Typography>
                </motion.div>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: { xs: 3, md: 4 }, 
                    backgroundColor: 'rgba(0,0,0,0.4)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                >
                  <form ref={formRef} onSubmit={handleSubmit}>
                    {/* Name and Email - Side by side for mobile and up */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <motion.div variants={itemVariants}>
                          <FormLabel>Your Name*</FormLabel>
                          <StyledTextField
                            placeholder="Full name"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={formErrors.name}
                          />
                          {formErrors.name && (
                            <FormHelperText error sx={{ mt: -2, mb: 2, fontSize: { xs: '11px', md: '12px' } }}>
                              Please enter your name
                            </FormHelperText>
                          )}
                        </motion.div>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <motion.div variants={itemVariants}>
                          <FormLabel>Email Address*</FormLabel>
                          <StyledTextField
                            placeholder="Email address"
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={formErrors.email}
                          />
                          {formErrors.email && (
                            <FormHelperText error sx={{ mt: -2, mb: 2, fontSize: { xs: '11px', md: '12px' } }}>
                              Please enter a valid email
                            </FormHelperText>
                          )}
                        </motion.div>
                      </Grid>
                    </Grid>
                    
                    {/* Phone and Subject - Side by side */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <motion.div variants={itemVariants}>
                          <FormLabel>Phone Number</FormLabel>
                          <StyledTextField
                            placeholder="Phone number"
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </motion.div>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <motion.div variants={itemVariants}>
                          <FormLabel>Subject</FormLabel>
                          <StyledTextField
                            placeholder="What is this regarding?"
                            fullWidth
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                          />
                        </motion.div>
                      </Grid>
                    </Grid>
                    
                    <motion.div variants={itemVariants}>
                      <FormLabel>Message*</FormLabel>
                      <StyledTextField
                        placeholder="Type your message here..."
                        fullWidth
                        multiline
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={formErrors.message}
                        sx={{ 
                          '& .MuiInputBase-inputMultiline': { 
                            py: 1.5,
                            fontSize: { xs: '13px', md: '14px' }
                          } 
                        }}
                      />
                      {formErrors.message && (
                        <FormHelperText error sx={{ mt: -2, mb: 2, fontSize: { xs: '11px', md: '12px' } }}>
                          Please enter your message
                        </FormHelperText>
                      )}
                    </motion.div>
                    
                    <motion.div variants={itemVariants} style={{ marginTop: '24px' }}>
                      <SubmitButton 
                        type="submit" 
                        disabled={loading}
                        endIcon={<SendIcon sx={{ fontSize: { xs: '16px', md: '20px' } }} />}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </SubmitButton>
                    </motion.div>
                  </form>
                </Paper>
              </motion.div>
            </Grid>
            
            {/* Contact Info Section */}
            <Grid item xs={12} md={5}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: { xs: 2, md: 4 }, 
                      fontFamily: HEADING_FONT,
                      fontWeight: 700,
                      fontSize: { xs: '24px', sm: '28px', md: '36px' }
                    }}
                  >
                    CONTACT INFORMATION
                  </Typography>
                </motion.div>
                
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {/* Contact cards side by side on mobile */}
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <ContactCard>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <LocationIcon sx={{ color: RED_COLOR, mr: 2, fontSize: { xs: 24, md: 28 } }} />
                          <Box>
                            <Typography variant="h6" sx={{ 
                              mb: 1, 
                              fontFamily: HEADING_FONT,
                              fontSize: { xs: '16px', md: '18px' }
                            }}>
                              OUR LOCATION
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: 'rgba(255, 255, 255, 0.8)', 
                              fontFamily: BODY_FONT,
                              fontSize: { xs: '13px', md: '14px' }
                            }}>
                              Rozelle NSW 2039, Australia
                            </Typography>
                          </Box>
                        </Box>
                      </ContactCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={6} md={12}>
                    <motion.div variants={itemVariants}>
                      <ContactCard>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <PhoneIcon sx={{ color: RED_COLOR, mr: 2, fontSize: { xs: 24, md: 28 } }} />
                          <Box>
                            <Typography variant="h6" sx={{ 
                              mb: 1, 
                              fontFamily: HEADING_FONT,
                              fontSize: { xs: '16px', md: '18px' }
                            }}>
                              PHONE NUMBER
                            </Typography>
                            <Typography variant="body1" sx={{ 
                              color: 'rgba(255, 255, 255, 0.8)', 
                              fontFamily: BODY_FONT,
                              fontSize: { xs: '13px', md: '14px' }
                            }}>
                              +61 423 440 056
                            </Typography>
                          </Box>
                        </Box>
                      </ContactCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={6} md={12}>
                    <motion.div variants={itemVariants}>
                      <ContactCard>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <EmailIcon sx={{ color: RED_COLOR, mr: 2, fontSize: { xs: 24, md: 28 }, flexShrink: 0 }} />
                          <Box sx={{ overflow: 'hidden' }}>
                            <Typography variant="h6" sx={{ 
                              mb: 1, 
                              fontFamily: HEADING_FONT,
                              fontSize: { xs: '16px', md: '18px' }
                            }}>
                              EMAIL ADDRESS
                            </Typography>
                            <Typography
                              sx={{
                                color: 'white',
                                fontSize: '16px',
                              fontFamily: BODY_FONT,
                                fontWeight: 300,
                                opacity: 0.8,
                                mb: 0.5,
                              }}
                            >
                              motextransportau@gmail.com
                            </Typography>
                          </Box>
                        </Box>
                      </ContactCard>
                    </motion.div>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mt: { xs: 1, md: 2 }, 
                          mb: { xs: 2, md: 3 }, 
                          fontFamily: HEADING_FONT,
                          fontWeight: 600,
                          fontSize: { xs: '18px', md: '20px' }
                        }}
                      >
                        FOLLOW US
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <IconButton 
                          sx={{ 
                            color: 'white', 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': { backgroundColor: RED_COLOR },
                            padding: { xs: '6px', md: '8px' },
                          }}
                          component="a"
                          href="https://www.instagram.com/motextransport/"
                        >
                          <InstagramIcon sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
                        </IconButton>
                      </Stack>
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Map Section */}
          <Box sx={{ mt: { xs: 5, md: 8 } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: { xs: 2, md: 4 }, 
                  fontFamily: HEADING_FONT,
                  fontWeight: 700,
                  fontSize: { xs: '24px', sm: '28px', md: '36px' }
                }}
              >
                FIND US
              </Typography>
              <MapContainer>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13253.201999999999!2d151.1671803!3d-33.8647532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12afe54ac57777%3A0x63a9fb8de35c7cf9!2sRozelle%20NSW%202039%2C%20Australia!5e0!3m2!1sen!2sus!4v1710301828283!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MOTEX Transport Location Map"
                ></iframe>
              </MapContainer>
            </motion.div>
          </Box>
        </Container>
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
              component={RouterLink} 
              to="/"
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
              component={RouterLink} 
              to="/services"
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
              component={RouterLink} 
              to="/about-us"
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="About Us" 
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
              component={RouterLink} 
              to="/instant-quote"
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
              component={RouterLink} 
              to="/gallery"
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
              component={RouterLink} 
              to="/contact-us"
              sx={{ 
                py: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
              }}
            >
              <ListItemText 
                primary="Contact Us" 
                primaryTypographyProps={{ 
                  fontFamily: BODY_FONT, 
                  fontWeight: 600, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Box sx={{ p: 2, mt: 2 }}>
          <Button 
            component={RouterLink} 
            to="/instant-quote"
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
    </PageWrapper>
  );
};

export default ContactUsPage;