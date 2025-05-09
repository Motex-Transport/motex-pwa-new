import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { HelmetProvider } from 'react-helmet-async';
import './fonts/custom-fonts.css'; // Import custom fonts

// Import pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import TableListPage from './pages/TableListPage';
import TableDetailPage from './pages/TableDetailPage';
import InstantQuotePage from './pages/InstantQuotePage';
import QuoteSuccessPage from './pages/QuoteSuccessPage';
import GalleryPage from './pages/GalleryPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ServicesPage from './pages/ServicesPage';

// Import quote flow pages
import ServiceSelectionPage from './pages/quote/ServiceSelectionPage';
import LocationSelectionPage from './pages/quote/LocationSelectionPage';
import DetailsPage from './pages/quote/DetailsPage';
import ReviewPage from './pages/quote/ReviewPage';

// Import components
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import BottomNavBar from './components/BottomNavBar';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasCompletedOnboarding', 'true');
  };

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {showSplash ? (
          <SplashScreen onFinish={handleSplashFinish} />
        ) : showOnboarding ? (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              
              {/* Legacy instant quote page - will redirect to new flow */}
              <Route path="/instant-quote" element={<ServiceSelectionPage />} />
              
              {/* New multi-step quote process */}
              <Route path="/quote/service" element={<ServiceSelectionPage />} />
              <Route path="/quote/location" element={<LocationSelectionPage />} />
              <Route path="/quote/details" element={<DetailsPage />} />
              <Route path="/quote/review" element={<ReviewPage />} />
              
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/quote-success" element={<QuoteSuccessPage />} />
            </Routes>
            <BottomNavBar />
          </Router>
        )}
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;