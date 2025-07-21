"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Example Snazzy Maps style (replace with your favorite from snazzymaps.com)
const snazzyMapStyle = [
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
      { "saturation": -80 }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#00ffee" },
      { "saturation": 50 }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
];

export default function GoogleMapComponent({
  latlng,
  onPick,
  apiKey,
}: {
  latlng: { lat: number; lng: number } | null;
  onPick: (lat: number, lng: number) => void;
  apiKey: string;
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const handleClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onPick(e.latLng.lat(), e.latLng.lng());
    }
  }, [onPick]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={latlng || { lat: 20, lng: 0 }}
      zoom={latlng ? 13 : 2}
      options={{ styles: snazzyMapStyle, disableDefaultUI: false }}
      onClick={handleClick}
    >
      {latlng && <Marker position={latlng} />}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}
