import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { userActions } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store';

const LocationMarker = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.user.userState.currentLocation);

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      dispatch(userActions.setCurrentLocation(e));
      if (currentLocation) {
        map.flyTo(currentLocation, map.getZoom());
      }
    });
  }, [dispatch, map, currentLocation]);

  return currentLocation === undefined ? null : (
    <Marker position={currentLocation}>
      <Popup>Your current location</Popup>
    </Marker>
  );
};

export default LocationMarker;
