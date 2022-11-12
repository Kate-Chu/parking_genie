import { memo, useEffect } from 'react';
import { TileLayer } from 'react-leaflet';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from '../../store';
import UserLocationMarker from '../UserLocationMarker';
import DestinationMarker from '../DestinationMarker';
import ParkingLotsMarkerContainer from '../ParkingLotsMarkerContainer';
import LocationButton from '../LocationButton';
import { fetchParkingLotsInfo } from '../../store/parkingLotsSlice';

import './Map.scss';

const Map = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchParkingLotsInfo());
  }, [dispatch]);

  return (
    <div id="map" data-testid="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ToastContainer />
      <LocationButton />
      <UserLocationMarker />
      <DestinationMarker />
      <ParkingLotsMarkerContainer />
    </div>
  );
};

export default memo(Map);
