import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LINE_TAIWAN } from '../../data/data';
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
      <MapContainer center={LINE_TAIWAN} zoom={17} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationButton />
        <UserLocationMarker />
        <DestinationMarker />
        <ParkingLotsMarkerContainer />
      </MapContainer>
    </div>
  );
};

export default Map;
