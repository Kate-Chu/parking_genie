import { useEffect } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { fetchCurrentLocation } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import carIcon from '../../assets/car.png';

const UserLocationMarker = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  // const currentLocation = useAppSelector((state) => state.user.userState.currentLocation);

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
        <h1 className="tx-base font-bold">目前位置</h1>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;
