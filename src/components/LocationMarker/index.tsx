import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { userActions } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/useTypedSelector';

const LocationMarker = () => {
  const map = useMap();
  const currentLocation = useAppSelector((state) => state.user.userState.currentLocation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      dispatch(userActions.setCurrentLocation(e.latlng));
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [dispatch, map]);

  return currentLocation === null ? null : (
    <Marker position={currentLocation}>
      <Popup>Your current location</Popup>
    </Marker>
  );
};

export default LocationMarker;
