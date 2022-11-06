import { useEffect } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { userActions } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import carIcon from '../../assets/car.png';

const UserLocationMarker = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector((state) => state.user.userState.currentLocation);

  const icon = L.icon({
    iconUrl: carIcon,
    iconSize: [45, 45],
  });

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      dispatch(userActions.setCurrentLocation(e));
      if (currentLocation) {
        map.flyTo(currentLocation, map.getZoom());
      }
    });
  }, [dispatch, map, currentLocation]);

  return currentLocation === undefined ? null : (
    <Marker position={currentLocation} icon={icon}>
      <Popup>
        <h1 className="tx-base font-bold">目前位置</h1>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;
