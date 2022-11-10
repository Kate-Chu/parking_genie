import { useEffect } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { toast, ToastContainer } from 'react-toastify';
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
  const isRealLocation = useAppSelector(
    (state) => state.user.userState.currentLocation.isRealLocation,
  );

  if (currentLocation) {
    if (!isRealLocation) {
      toast.info(
        '很抱歉，我們目前僅提供台北市內的服務，因偵測您目前的位置位於外縣市，因此我們將為您導向 LINE_TAIPEI，近期將為您推出其他縣市的服務！',
      );
    }
    map.flyTo(currentLocation, map.getZoom());
  }

  return currentLocation === undefined ? null : (
    <>
      <Marker position={currentLocation} icon={icon}>
        <Popup>
          <h1 className="text-base font-bold">目前位置</h1>
        </Popup>
      </Marker>
      <ToastContainer />
    </>
  );
};

export default UserLocationMarker;
