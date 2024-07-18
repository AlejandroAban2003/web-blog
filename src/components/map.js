import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ lat, lng, onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat, lng });

  const mapStyles = {
    height: "200px",
    width: "100%"
  };

  const defaultCenter = {
    lat: currentLocation.lat,
    lng: currentLocation.lng
  };

  const handleClick = (e) => {
    if (onLocationSelect) {
      onLocationSelect(e.latLng.lat(), e.latLng.lng());
    }
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyDtLrJaKGBVuVZ2y1pD3o1bFycvA13I1t8'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        onClick={handleClick}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
