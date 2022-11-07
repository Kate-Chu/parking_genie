import { useEffect } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCurrentLocation } from '../../store/userSlice';
import { parkingLotsActions } from '../../store/parkingLotsSlice';
import carIcon from '../../assets/car.png';

const UserLocationMarker = () => {
  const map = useMap();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(parkingLotsActions.setMapBounds(map.getBounds()));
  }, [dispatch, map]);

  const icon = L.icon({
    iconUrl: carIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      dispatch(fetchCurrentLocation(e));
    });
  }, [dispatch, map]);

  const currentLocation = useAppSelector(
    (state) => state.user.userState.currentLocation.latLng,
  );

  if (currentLocation) {
    map.flyTo(currentLocation, map.getZoom());
  }

  return currentLocation === undefined ? null : (
    <Marker position={currentLocation} icon={icon}>
      <Popup>
        <h1 className="tx-lg font-bold">目前位置</h1>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;
