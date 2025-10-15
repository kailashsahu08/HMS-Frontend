import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";

const Contact = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const defaultCenter = { lat: 0, lng: 0 };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: defaultCenter,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
          },
        ],
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            map.setCenter(pos);

            const marker = new window.google.maps.Marker({
              position: pos,
              map: map,
              title: "Your Location",
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#22c55e",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: "You are here",
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Contact</span>
                  <span className="block text-green-600">We're here to help</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Have questions? We'd love to hear from you. Send us a message and
                  we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-green-600 text-xl"></i>
                    <p className="ml-3 text-gray-600">
                      123 Hospital Street, Medical District, City, Country
                    </p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-phone text-green-600 text-xl"></i>
                    <p className="ml-3 text-gray-600">+1 (123) 456-7890</p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-envelope text-green-600 text-xl"></i>
                    <p className="ml-3 text-gray-600">
                      contact@hospitalmanagement.com
                    </p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-clock text-green-600 text-xl"></i>
                    <p className="ml-3 text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Your Current Location
                </h3>
                <div ref={mapRef} id="map" className="h-96 w-full rounded-lg"></div>
                <p className="mt-4 text-sm text-gray-500">
                  Your location will be shown on the map above. This helps us
                  provide better service.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                  Send us a Message
                </Typography>
                <Box component="form" display="flex" flexDirection="column" gap={2}>
                  <TextField label="Name" variant="outlined" fullWidth />
                  <TextField label="Email" type="email" variant="outlined" fullWidth />
                  <TextField label="Phone Number" type="tel" variant="outlined" fullWidth />
                  <TextField label="Subject" variant="outlined" fullWidth />
                  <TextField label="Message" variant="outlined" multiline rows={4} fullWidth />
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#22c55e", "&:hover": { bgcolor: "#16a34a" }, py: 1.5 }}
                    fullWidth
                  >
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
