import { useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';

const LocationMarker = () => {
  const linePosition: LatLngExpression = [25.077227381690932, 121.5756255526039];
  const map = useMap();
  const [position, setPosition] = useState<LatLngExpression>(linePosition);

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Your current location</Popup>
    </Marker>
  );
};

export default LocationMarker;
