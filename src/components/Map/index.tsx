import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.scss';

type Position = [number, number];

const Map = () => {
  const linePosition: Position = [25.077227381690932, 121.5756255526039];
  const [userLocation, setUserLocation] = useState<Position>(linePosition);

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  } else {
    console.log('geolocation not available');
  }

  return (
    <div id="map">
      <MapContainer center={userLocation} zoom={8} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userLocation}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
