import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useAppSelector } from '../../store';

const DestinationMarker = () => {
  const map = useMap();
  const destination = useAppSelector((state) => state.user.userState.destination);

  useEffect(() => {
    if (destination.location) {
      map.flyTo(destination.location, map.getZoom());
    }
  }, [destination.placeId, map]);

  return destination.location === undefined ? null : (
    <Marker position={destination.location}>
      <Popup>{destination.searchInput}</Popup>
    </Marker>
  );
};

export default React.memo(DestinationMarker);
