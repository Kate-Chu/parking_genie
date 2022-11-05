import React, { useEffect } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useAppSelector } from '../../store';
import locationIcon from '../../assets/location-pin.png';

const DestinationMarker = () => {
  const map = useMap();
  const destination = useAppSelector((state) => state.user.userState.destination);

  const icon = L.icon({
    iconUrl: locationIcon,
    iconSize: [40, 40],
  });

  useEffect(() => {
    if (destination.location) {
      map.flyTo(destination.location, map.getZoom());
    }
  }, [destination.placeId, map]);

  return destination.location === undefined ? null : (
    <Marker position={destination.location} icon={icon}>
      <Popup>{destination.searchInput}</Popup>
    </Marker>
  );
};

export default React.memo(DestinationMarker);
