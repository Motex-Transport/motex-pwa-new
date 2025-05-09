import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, Tooltip, ZoomControl } from 'react-leaflet';
import { LatLngExpression, Icon, LeafletMouseEvent, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './OSMMap.css';
import { Box, Typography, Button, CircularProgress, Paper, Chip, useTheme, useMediaQuery } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StraightenIcon from '@mui/icons-material/Straighten';

// Fix for default marker icons in Leaflet with React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Define types for locations
export interface LocationData {
  address: string;
  latLng: LatLngExpression;
}

interface OSMMapProps {
  pickupLocation: LocationData | null;
  dropoffLocation: LocationData | null;
  onPickupLocationChange: (location: LocationData) => void;
  onDropoffLocationChange: (location: LocationData) => void;
  selectingPickup: boolean;
  setSelectingPickup: (selecting: boolean) => void;
}

// Fix marker icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create custom icons for a more modern look
const createCustomIcon = (color: string, isMobile: boolean): L.Icon => {
  // Scale up icons for mobile
  const scale = isMobile ? 1.4 : 1;
  const iconSize: L.PointTuple = [Math.floor(25 * scale), Math.floor(41 * scale)];
  const iconAnchor: L.PointTuple = [Math.floor(12 * scale), Math.floor(41 * scale)];
  const shadowSize: L.PointTuple = [Math.floor(41 * scale), Math.floor(41 * scale)];
  
  return new L.Icon({
    iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconRetinaUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: markerShadow,
    iconSize,
    iconAnchor,
    popupAnchor: [1, -34],
    shadowSize
  } as L.IconOptions);
};

// Calculate distance between two points
const calculateDistance = (
  point1: LatLngExpression,
  point2: LatLngExpression
): { distance: number; formattedDistance: string } => {
  // Extract coordinates, handling different LatLngExpression formats
  const getCoords = (point: LatLngExpression): [number, number] => {
    if (Array.isArray(point)) {
      return [Number(point[0]), Number(point[1])];
    } else if (typeof point === 'object' && 'lat' in point && 'lng' in point) {
      return [Number(point.lat), Number(point.lng)];
    }
    return [0, 0];
  };

  const [lat1, lon1] = getCoords(point1);
  const [lat2, lon2] = getCoords(point2);

  // Haversine formula for calculating distance between two points on Earth
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return {
    distance,
    formattedDistance: `${distance.toFixed(2)} km`
  };
};

// LocationMarker component to handle click events
const LocationMarker: React.FC<{
  selectingPickup: boolean;
  onPickupLocationChange: (location: LocationData) => void;
  onDropoffLocationChange: (location: LocationData) => void;
  isMobile: boolean;
}> = ({ selectingPickup, onPickupLocationChange, onDropoffLocationChange, isMobile }) => {
  const [loading, setLoading] = useState(false);
  
  const map = useMapEvents({
    click: async (e: LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setLoading(true);
      
      try {
        // Perform reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        
        if (!response.ok) {
          throw new Error('Geocoding request failed');
        }
        
        const data = await response.json();
        const address = data.display_name || 'Unknown location';
        
        // Update the appropriate location based on what we're selecting
        if (selectingPickup) {
          onPickupLocationChange({ address, latLng: [lat, lng] });
        } else {
          onDropoffLocationChange({ address, latLng: [lat, lng] });
        }
      } catch (error) {
        console.error('Error geocoding location:', error);
        // Still update with coordinates even if geocoding fails
        const locationData = {
          address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          latLng: [lat, lng] as LatLngExpression
        };
        
        if (selectingPickup) {
          onPickupLocationChange(locationData);
        } else {
          onDropoffLocationChange(locationData);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return loading ? (
    <Box position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <Paper elevation={3} sx={{ 
        p: isMobile ? 2 : 1.5, 
        borderRadius: isMobile ? 3 : 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}>
        <CircularProgress size={isMobile ? 24 : 20} />
        <Typography variant={isMobile ? "body1" : "body2"} fontWeight="medium">Finding address...</Typography>
      </Paper>
    </Box>
  ) : null;
};

// Main OSM Map component
const OSMMap: React.FC<OSMMapProps> = ({
  pickupLocation,
  dropoffLocation,
  onPickupLocationChange,
  onDropoffLocationChange,
  selectingPickup,
  setSelectingPickup
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mapRef = useRef<any>(null);
  const defaultCenter: LatLngExpression = [-33.8688, 151.2093]; // Sydney, Australia default
  const defaultZoom = isMobile ? 12 : 13; // Slightly zoomed out on mobile for better context
  
  // Create icons with appropriate sizing for device
  const pickupIcon = createCustomIcon('green', isMobile);
  const dropoffIcon = createCustomIcon('red', isMobile);
  
  // Calculate midpoint and distance for the route line
  const getRouteInfo = () => {
    if (!pickupLocation || !dropoffLocation) return null;
    
    const { distance, formattedDistance } = calculateDistance(
      pickupLocation.latLng,
      dropoffLocation.latLng
    );
    
    // Calculate approximate midpoint (this is a simple approximation)
    const getMidpoint = (): LatLngExpression => {
      if (Array.isArray(pickupLocation.latLng) && Array.isArray(dropoffLocation.latLng)) {
        return [
          (pickupLocation.latLng[0] + dropoffLocation.latLng[0]) / 2,
          (pickupLocation.latLng[1] + dropoffLocation.latLng[1]) / 2
        ];
      } else {
        // Default fallback if format is different
        return [0, 0];
      }
    };
    
    // Estimate travel time (very simple estimate)
    const averageSpeed = 40; // km/h
    const estimatedMinutes = Math.round((distance / averageSpeed) * 60);
    const formattedDuration = estimatedMinutes < 60
      ? `${estimatedMinutes} min`
      : `${Math.floor(estimatedMinutes / 60)} hr ${estimatedMinutes % 60} min`;
    
    return {
      distance,
      formattedDistance,
      midpoint: getMidpoint(),
      formattedDuration
    };
  };
  
  const routeInfo = getRouteInfo();
  
  // When both locations are set, fit the map to show both points
  useEffect(() => {
    if (!mapRef.current || !pickupLocation || !dropoffLocation) return;
    
    const map = mapRef.current;
    
    // Create bounds that include both pickup and dropoff locations
    if (map && pickupLocation && dropoffLocation) {
      try {
        const bounds = [
          pickupLocation.latLng,
          dropoffLocation.latLng
        ];
        // Add more padding on mobile for better viewing
        map.fitBounds(bounds, { padding: isMobile ? [60, 60] : [50, 50] });
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    }
  }, [pickupLocation, dropoffLocation, isMobile]);
  
  // Fly to a location when it's updated
  useEffect(() => {
    if (!mapRef.current) return;
    
    const map = mapRef.current;
    
    // Only fly to the location if we're updating the currently selected type
    if (selectingPickup && pickupLocation) {
      map.flyTo(pickupLocation.latLng, defaultZoom);
    } else if (!selectingPickup && dropoffLocation) {
      map.flyTo(dropoffLocation.latLng, defaultZoom);
    }
  }, [pickupLocation, dropoffLocation, selectingPickup, defaultZoom]);
  
  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
      <MapContainer 
        center={
          selectingPickup && pickupLocation 
            ? pickupLocation.latLng
            : !selectingPickup && dropoffLocation
              ? dropoffLocation.latLng
              : defaultCenter
        }
        zoom={defaultZoom} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        zoomControl={false} // Hide default zoom controls for cleaner UI
        attributionControl={!isMobile} // Hide attribution on mobile to save space
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Custom position for zoom controls - better for mobile */}
        <ZoomControl position={isMobile ? "bottomleft" : "topleft"} />
        
        {/* Route line between pickup and dropoff */}
        {pickupLocation && dropoffLocation && routeInfo && (
          <Polyline
            positions={[pickupLocation.latLng, dropoffLocation.latLng]}
            pathOptions={{ 
              color: '#4285F4', 
              weight: isMobile ? 6 : 5, 
              opacity: 0.7, 
              dashArray: isMobile ? '12, 12' : '10, 10' 
            }}
          />
        )}
        
        {pickupLocation && (
          <Marker 
            position={pickupLocation.latLng} 
            icon={pickupIcon}
          >
            <Popup className="custom-popup" minWidth={isMobile ? 220 : 180}>
              <Box sx={{ p: isMobile ? 1 : 0.5 }}>
                <Typography variant="body2" fontWeight="bold" fontSize={isMobile ? '1rem' : '0.9rem'}>Pickup</Typography>
                <Typography variant="body2" fontSize={isMobile ? '0.9rem' : '0.8rem'}>{pickupLocation.address}</Typography>
              </Box>
            </Popup>
          </Marker>
        )}
        
        {dropoffLocation && (
          <Marker 
            position={dropoffLocation.latLng} 
            icon={dropoffIcon}
          >
            <Popup className="custom-popup" minWidth={isMobile ? 220 : 180}>
              <Box sx={{ p: isMobile ? 1 : 0.5 }}>
                <Typography variant="body2" fontWeight="bold" fontSize={isMobile ? '1rem' : '0.9rem'}>Dropoff</Typography>
                <Typography variant="body2" fontSize={isMobile ? '0.9rem' : '0.8rem'}>{dropoffLocation.address}</Typography>
              </Box>
            </Popup>
          </Marker>
        )}
        
        <LocationMarker 
          selectingPickup={selectingPickup}
          onPickupLocationChange={onPickupLocationChange}
          onDropoffLocationChange={onDropoffLocationChange}
          isMobile={isMobile}
        />
      </MapContainer>
      
      {/* Distance info chips */}
      {pickupLocation && dropoffLocation && routeInfo && (
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? 64 : 20,
            right: isMobile ? 16 : 20,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 1.5 : 1,
          }}
        >
          <Chip
            icon={<StraightenIcon />}
            label={routeInfo.formattedDistance}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              fontWeight: 'bold',
              boxShadow: 3,
              py: isMobile ? 1 : 0.5,
              height: 'auto',
              '& .MuiChip-icon': { color: 'primary.main' },
              '& .MuiChip-label': { px: 1.5, fontSize: isMobile ? '0.95rem' : '0.85rem' }
            }}
          />
          
          <Chip
            icon={<AccessTimeIcon />}
            label={routeInfo.formattedDuration}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              fontWeight: 'bold',
              boxShadow: 3,
              py: isMobile ? 1 : 0.5,
              height: 'auto',
              '& .MuiChip-icon': { color: 'primary.main' },
              '& .MuiChip-label': { px: 1.5, fontSize: isMobile ? '0.95rem' : '0.85rem' }
            }}
          />
        </Box>
      )}
      
      {/* Mobile tap instruction overlay - only show initially on mobile */}
      {isMobile && !pickupLocation && !dropoffLocation && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            p: 2,
            borderRadius: 3,
            width: '80%',
            maxWidth: '300px',
            textAlign: 'center',
            gap: 1,
            boxShadow: 3
          }}
        >
          <Typography variant="body1" fontWeight="medium">Tap on the map to select locations</Typography>
          <Typography variant="body2">Or use the search bar below</Typography>
        </Box>
      )}
    </Box>
  );
};

export default OSMMap; 