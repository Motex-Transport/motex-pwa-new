import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  FormControlLabel, 
  Radio,
  useTheme,
  useMediaQuery,
  RadioGroup,
  Stack,
  Link,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import emailjs from '@emailjs/browser';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useLocation } from 'react-router-dom';

// Define colors
const DARK_BG = '#0A0A0A';
const WHITE_TEXT = '#FFFFFF';
const ACCENT_COLOR = '#38BDF8';
const INPUT_BG = 'rgba(255, 255, 255, 0.05)';
const RED_COLOR = '#DE1F27';

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

// New styled components for the updated design
const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '12px 16px',
  backgroundColor: INPUT_BG,
  border: 'none',
  borderRadius: '4px',
  color: WHITE_TEXT,
  fontSize: '14px',
  fontFamily: '"Mulish", sans-serif',
  outline: 'none',
  transition: 'all 0.2s ease',
  '&:focus': {
    boxShadow: `0 0 0 2px ${ACCENT_COLOR}`,
  },
  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    padding: '10px 14px',
  }
}));

const StyledTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  padding: '12px 16px',
  backgroundColor: INPUT_BG,
  border: 'none',
  borderRadius: '4px',
  color: WHITE_TEXT,
  fontSize: '14px',
  fontFamily: '"Mulish", sans-serif',
  outline: 'none',
  minHeight: '100px',
  resize: 'vertical',
  transition: 'all 0.2s ease',
  '&:focus': {
    boxShadow: `0 0 0 2px ${ACCENT_COLOR}`,
  },
  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    padding: '10px 14px',
    minHeight: '80px',
  }
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  marginBottom: theme.spacing(1),
  fontFamily: '"Mulish", sans-serif',
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    marginBottom: theme.spacing(0.5),
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
  fontFamily: '"Mulish", sans-serif',
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

const CalendarWrapper = styled(Box)(({ theme }) => ({
  '& .MuiPickersDay-root': {
    color: WHITE_TEXT,
  },
  '& .MuiPickersDay-today': {
    borderColor: RED_COLOR,
  },
  '& .MuiPickersDay-daySelected': {
    backgroundColor: RED_COLOR,
    color: WHITE_TEXT,
  },
  '& .MuiPickersCalendarHeader-switchHeader': {
    color: WHITE_TEXT,
  },
  '& .MuiDayCalendar-weekDayLabel': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiPickersCalendarHeader-label': {
    color: WHITE_TEXT,
  },
  '& .MuiPickersArrowSwitcher-button': {
    color: WHITE_TEXT,
  },
  '& .MuiPaper-root': {
    backgroundColor: DARK_BG,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  '& .MuiDialogActions-root': {
    backgroundColor: DARK_BG,
    color: WHITE_TEXT,
  },
  '& .MuiButton-root': {
    color: WHITE_TEXT,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiDialog-paper': {
    backgroundImage: 'none',
    backgroundColor: DARK_BG,
  },
  '& .MuiYearCalendar-root': {
    backgroundColor: DARK_BG,
    color: WHITE_TEXT,
  },
  '& .MuiPickersYear-yearButton': {
    color: WHITE_TEXT,
    '&.Mui-selected': {
      backgroundColor: RED_COLOR,
      color: WHITE_TEXT,
    },
  },
  '& .MuiPickersToolbar-root': {
    backgroundColor: DARK_BG,
    color: WHITE_TEXT,
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const InstantQuotePage = () => {
  const location = useLocation();
  const { state } = location;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("4UoPVi0_UFU0fK2L0");
  }, []);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    window.location.href = path;
    window.scrollTo(0, 0);
  };
  
  // Form state matching Supabase table
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    goods_description: '',
    size: '',
    service_mode: state?.selectedService || 'Parcel Delivery',
    pickup_suburb: '',
    pickup_access: 'Ground Floor',
    delivery_suburb: '',
    delivery_access: 'Ground Floor',
    date: null as string | null,
    time: null as string | null,
    is_fragile: false,
    other_info: '',
    // For "Other Inquiries" section
    inquiry_name: '',
    inquiry_email: '',
    inquiry_message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setFormData({
      ...formData,
      date: date ? date.format('YYYY-MM-DD') : null
    });
  };

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    setFormData({
      ...formData,
      time: time ? time.format('HH:mm') : null
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get current year for the footer
      const currentYear = new Date().getFullYear();
      
      // Send confirmation email to user
      const customerEmailParams = {
        service_id: 'service_g472qdp',
        template_id: 'template_cce116x',
        user_id: '4UoPVi0_UFU0fK2L0',
        template_params: {
          to_email: formData.email,
          to_name: `${formData.first_name} ${formData.last_name}`,
          pickup_suburb: formData.pickup_suburb,
          delivery_suburb: formData.delivery_suburb,
          date: formData.date,
          time: formData.time,
          goods_description: formData.goods_description,
          size: formData.size,
          service_mode: formData.service_mode,
          message: 'Thank you for your quote request. Our team will review it and get back to you within 24 hours.'
        }
      };
      
      // For admin notification, send all fields directly
      const adminEmailParams = {
        service_id: 'service_g472qdp',
        template_id: 'template_92wv5g9',
        user_id: '4UoPVi0_UFU0fK2L0',
        template_params: {
          // Individual form fields
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          goods_description: formData.goods_description,
          size: formData.size,
          service_mode: formData.service_mode,
          pickup_suburb: formData.pickup_suburb,
          pickup_access: formData.pickup_access,
          delivery_suburb: formData.delivery_suburb,
          delivery_access: formData.delivery_access,
          date: formData.date || "Not specified",
          time: formData.time || "Not specified",
          is_fragile: formData.is_fragile ? "Yes" : "No",
          other_info: formData.other_info || "None provided",
          
          // Full JSON data for reference
          form_data: JSON.stringify(formData, null, 2),
          submission_time: new Date().toLocaleString(),
          current_year: currentYear.toString()
        }
      };
      
      // Send the customer confirmation email
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
      
      // Send the admin notification email
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
      
      console.log('Form submitted:', formData);
      
      // Open the success dialog instead of alert
      setSuccessDialogOpen(true);
      
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        goods_description: '',
        size: '',
        service_mode: 'Parcel Delivery',
        pickup_suburb: '',
        pickup_access: 'Ground Floor',
        delivery_suburb: '',
        delivery_access: 'Ground Floor',
        date: null,
        time: null,
        is_fragile: false,
        other_info: '',
        inquiry_name: '',
        inquiry_email: '',
        inquiry_message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again. Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageWrapper>
        {/* Header - Matching LandingPage.tsx */}
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
                      color: RED_COLOR,
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
                  component={RouterLink}
                  to="/instant-quote" 
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
        
        {/* Add toolbar spacer to prevent content from being hidden under fixed AppBar */}
        <Box sx={{ height: '64px' }} />
        
        <ContentSection>
          {/* Main content with full-width layout */}
          <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', px: { xs: 2, sm: 4 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              <Typography variant="h2" component="h1" sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: { xs: 1, md: 2 },
                letterSpacing: '-0.5px',
                fontFamily: '"Oswald", sans-serif',
              }}>
                GET INSTANT QUOTE
              </Typography>
              
              <Typography variant="body1" sx={{ 
                opacity: 0.7,
                maxWidth: 600,
                mx: 'auto',
                fontFamily: '"Mulish", sans-serif',
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
              }}>
                Fill out the form below to receive a custom quote for your transport needs. We'll get back to you within 24 hours.
              </Typography>
            </Box>
            
            <FormSection sx={{ mb: { xs: 4, md: 6 } }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {/* Name Fields - side by side even on mobile */}
                  <Grid item xs={6} sm={6}>
                    <FormLabel>First Name</FormLabel>
                    <StyledInput
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={6} sm={6}>
                    <FormLabel>Last Name</FormLabel>
                    <StyledInput
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                    />
                  </Grid>
                  
                  {/* Email */}
                  <Grid item xs={12}>
                    <FormLabel>Email</FormLabel>
                    <StyledInput
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </Grid>
                  
                  {/* Description of Goods */}
                  <Grid item xs={12}>
                    <FormLabel>Description of Goods</FormLabel>
                    <StyledInput
                      name="goods_description"
                      value={formData.goods_description}
                      onChange={handleChange}
                      placeholder="Describe the items you need to transport"
                      required
                    />
                  </Grid>
                  
                  {/* Service/Mode Selection */}
                  <Grid item xs={12}>
                    <FormLabel>Service</FormLabel>
                    <RadioGroup
                      name="service_mode"
                      value={formData.service_mode}
                      onChange={handleChange}
                      sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { 
                          xs: '1fr 1fr', 
                          sm: '1fr 1fr', 
                          md: '1fr 1fr 1fr' 
                        }, 
                        gap: { xs: 0.5, sm: 1 }
                      }}
                    >
                      <FormControlLabel 
                        value="Parcel Delivery" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Parcel Delivery" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="Fragile Freight" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Fragile Freight" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="Interstate Delivery" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Interstate Delivery" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="Door to Door Service" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Door to Door Service" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="Same Day Delivery" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Same Day Delivery" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="Chauffeur" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Chauffeur" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                    </RadioGroup>
                  </Grid>
                  
                  {/* Size (L x W x H) in CM */}
                  <Grid item xs={12}>
                    <FormLabel>Size (L x W x H) in CM</FormLabel>
                    <StyledInput
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="e.g. 30 x 20 x 15"
                      required
                    />
                  </Grid>
                  
                  {/* Pickup and Delivery Suburbs - side by side even on mobile */}
                  <Grid item xs={6}>
                    <FormLabel>Pickup Suburb</FormLabel>
                    <StyledInput
                      name="pickup_suburb"
                      value={formData.pickup_suburb}
                      onChange={handleChange}
                      placeholder="e.g. Melbourne CBD"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={6}>
                    <FormLabel>Delivery Suburb</FormLabel>
                    <StyledInput
                      name="delivery_suburb"
                      value={formData.delivery_suburb}
                      onChange={handleChange}
                      placeholder="e.g. Sydney CBD"
                      required
                    />
                  </Grid>
                  
                  {/* Pickup Access */}
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Pickup Access</FormLabel>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block', 
                        mb: { xs: 0.5, md: 1.5 }, 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: BODY_FONT,
                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                      }}
                    >
                      If pickup location is not on ground floor, please include the information under 'Other Info' field below.
                    </Typography>
                    <RadioGroup
                      name="pickup_access"
                      value={formData.pickup_access}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel 
                        value="Ground Floor" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Ground floor" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)', 
                          mr: 3,
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="Stairs" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Stairs" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                    </RadioGroup>
                  </Grid>
                  
                  {/* Delivery Access */}
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Delivery Access</FormLabel>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block', 
                        mb: { xs: 0.5, md: 1.5 }, 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: BODY_FONT,
                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                      }}
                    >
                      If delivery location is not on ground floor, please include the information under 'Other Info' field below.
                    </Typography>
                    <RadioGroup
                      name="delivery_access"
                      value={formData.delivery_access}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel 
                        value="Ground Floor" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Ground floor" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)', 
                          mr: 3,
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="Stairs" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Stairs" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                    </RadioGroup>
                  </Grid>
                  
                  {/* Date and Time - side by side on all screen sizes */}
                  <Grid item xs={6}>
                    <FormLabel>Date</FormLabel>
                    <CalendarWrapper sx={{ 
                      backgroundColor: INPUT_BG,
                      borderRadius: '4px',
                      '& .MuiInputBase-root': { color: WHITE_TEXT },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                    }}>
                      <DatePicker
                        value={formData.date ? dayjs(formData.date) : null}
                        onChange={(date) => handleDateChange(date)}
                        slotProps={{
                          textField: {
                            placeholder: "Select date",
                            fullWidth: true,
                            required: true,
                            variant: "outlined",
                            sx: {
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiInputBase-input': { 
                                color: WHITE_TEXT, 
                                py: { xs: 1, md: 1.5 },
                                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                              },
                              '& .MuiSvgIcon-root': { color: WHITE_TEXT }
                            }
                          },
                          actionBar: {
                            actions: ['cancel', 'accept'],
                            sx: {
                              '& .MuiButton-root': {
                                color: WHITE_TEXT,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                              }
                            }
                          },
                          popper: {
                            sx: {
                              '& .MuiPaper-root': {
                                backgroundColor: DARK_BG,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                overflow: 'hidden'
                              }
                            }
                          }
                        }}
                      />
                    </CalendarWrapper>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <FormLabel>Time</FormLabel>
                    <Box sx={{ 
                      backgroundColor: INPUT_BG,
                      borderRadius: '4px',
                      '& .MuiInputBase-root': { color: WHITE_TEXT },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      '& .MuiPaper-root': { backgroundColor: DARK_BG },
                      '& .MuiClock-pin': { backgroundColor: RED_COLOR },
                      '& .MuiClockPointer-root': { backgroundColor: RED_COLOR },
                      '& .MuiClockPointer-thumb': { 
                        backgroundColor: RED_COLOR, 
                        borderColor: RED_COLOR 
                      },
                      '& .MuiClock-clock': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                      },
                      '& .MuiTypography-root': { color: WHITE_TEXT },
                      '& .MuiButtonBase-root': { color: WHITE_TEXT },
                      '& .MuiClockNumber-root': { 
                        color: WHITE_TEXT,
                        '&.Mui-disabled': {
                          color: 'rgba(255, 255, 255, 0.3)'
                        }
                      },
                      '& .MuiClockNumber-root.Mui-selected': { 
                        backgroundColor: RED_COLOR,
                        color: WHITE_TEXT
                      },
                      '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: RED_COLOR
                      },
                      '& .MuiPickersDay-root:hover': {
                        backgroundColor: 'rgba(222, 31, 39, 0.2)'
                      },
                      '& .MuiPickersLayout-root': {
                        backgroundColor: DARK_BG,
                        color: WHITE_TEXT,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      },
                      '& .MuiDialog-paper': {
                        backgroundImage: 'none',
                        backgroundColor: DARK_BG
                      },
                      '& .MuiPickersCalendarHeader-root': {
                        color: WHITE_TEXT
                      }
                    }}>
                      <TimePicker
                        value={formData.time ? dayjs(`2023-01-01T${formData.time}`) : null}
                        onChange={(time) => handleTimeChange(time)}
                        ampm={false}
                        closeOnSelect
                        skipDisabled
                        minutesStep={5}
                        timeSteps={{ minutes: 5 }}
                        localeText={{ 
                          toolbarTitle: "Select Time", 
                          cancelButtonLabel: "Cancel", 
                          okButtonLabel: "Confirm" 
                        }}
                        slotProps={{
                          textField: {
                            placeholder: "Select time",
                            fullWidth: true,
                            required: true,
                            variant: "outlined",
                            sx: {
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiInputBase-input': { 
                                color: WHITE_TEXT, 
                                py: { xs: 1, md: 1.5 },
                                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                              },
                              '& .MuiSvgIcon-root': { color: WHITE_TEXT }
                            }
                          },
                          actionBar: {
                            actions: ['cancel', 'accept'],
                            sx: {
                              '& .MuiButton-root': {
                                color: WHITE_TEXT,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                              }
                            }
                          },
                          toolbar: {
                            sx: {
                              backgroundColor: DARK_BG,
                              color: WHITE_TEXT,
                              '& .MuiTypography-root': {
                                color: WHITE_TEXT
                              }
                            }
                          },
                          digitalClockItem: {
                            sx: {
                              color: WHITE_TEXT,
                              '&.Mui-selected': {
                                backgroundColor: RED_COLOR,
                                color: WHITE_TEXT
                              }
                            }
                          },
                          popper: {
                            sx: {
                              zIndex: 1300,
                              '& .MuiPaper-root': {
                                backgroundColor: DARK_BG,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                overflow: 'hidden'
                              }
                            }
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                  
                  {/* Fragile */}
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Fragile</FormLabel>
                    <RadioGroup
                      name="is_fragile"
                      value={formData.is_fragile.toString()}
                      onChange={(e) => setFormData({...formData, is_fragile: e.target.value === 'true'})}
                      row
                    >
                      <FormControlLabel 
                        value="true" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="Yes" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)', 
                          mr: 3,
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                      <FormControlLabel 
                        value="false" 
                        control={<Radio size={isMobile ? "small" : "medium"} />} 
                        label="No" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          '.MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                          }
                        }}
                      />
                    </RadioGroup>
                  </Grid>
                  
                  {/* Other Info */}
                  <Grid item xs={12}>
                    <FormLabel>Other Info</FormLabel>
                    <StyledTextarea
                      name="other_info"
                      value={formData.other_info}
                      onChange={handleChange}
                      placeholder="Any other details we should know..."
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: { xs: 3, md: 4 }, maxWidth: { xs: '100%', sm: '400px' }, mx: 'auto' }}>
                  <SubmitButton 
                    type="submit"
                    disabled={loading}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      ...(loading && {
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '30%',
                          height: '100%',
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          animation: 'loading 1.5s infinite',
                        },
                        '@keyframes loading': {
                          '0%': {
                            transform: 'skewX(-30deg) translateX(-100%)',
                          },
                          '100%': {
                            transform: 'skewX(-30deg) translateX(300%)',
                          },
                        },
                      })
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Quote Request'}
                  </SubmitButton>
                </Box>
              </form>
            </FormSection> 
          </Box>
        </ContentSection>
          
        {/* Success Dialog - Updated for mobile */}
        <Dialog 
          open={successDialogOpen} 
          onClose={handleCloseSuccessDialog}
          PaperProps={{
            sx: {
              backgroundColor: DARK_BG,
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: WHITE_TEXT,
              maxWidth: { xs: '300px', sm: '400px' },
              width: '100%'
            }
          }}
        >
          <DialogContent sx={{ textAlign: 'center', py: { xs: 3, md: 4 } }}>
            <CheckCircleOutlineIcon sx={{ color: RED_COLOR, fontSize: { xs: 50, md: 60 }, mb: { xs: 1, md: 2 } }} />
            <Typography variant="h5" sx={{ 
              mb: { xs: 1, md: 2 },
              fontFamily: HEADING_FONT,
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}>
              Thank You!
            </Typography>
            <Typography sx={{ 
              mb: { xs: 2, md: 3 },
              fontFamily: BODY_FONT,
              fontSize: { xs: '0.85rem', md: '1rem' }
            }}>
              Your request has been submitted successfully. We'll get back to you within 24 hours.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 1.5, md: 2 }, justifyContent: 'center' }}>
            <Button 
              onClick={handleCloseSuccessDialog}
              sx={{
                backgroundColor: RED_COLOR,
                color: 'white',
                padding: { xs: '8px 20px', md: '10px 24px' },
                borderRadius: '50px',
                textTransform: 'none',
                fontFamily: BODY_FONT,
                fontWeight: 400,
                fontSize: { xs: '0.85rem', md: '0.95rem' },
                minWidth: { xs: '100px', md: '130px' },
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: '#c41922',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                }
              }}
            >
              Got it
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Mobile Menu Drawer */}
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
                onClick={() => {
                  handleNavigation('/instant-quote');
                  setIsMobileMenuOpen(false);
                }}
                sx={{ 
                  py: 1.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
                }}
              >
                <ListItemText 
                  primary="Instant Quote" 
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
      </PageWrapper>
    </LocalizationProvider>
  );
};

export default InstantQuotePage;