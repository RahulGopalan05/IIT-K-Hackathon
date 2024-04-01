import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapWithHotspots = ({ geolocation }) => {
  if (!geolocation || geolocation.latitude === undefined || geolocation.longitude === undefined) {
    return <div>Loading...</div>; // or some other placeholder component
  }

  const position = [geolocation.latitude, geolocation.longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {geolocation.location}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapWithHotspots;