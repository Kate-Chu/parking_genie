import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LINE_TAIWAN } from '../../data/default_data';
import { useAppDispatch } from '../../store';
import LocationMarker from '../UserLocationMarker';
import DestinationMarker from '../DestinationMarker';
import {
  fetchParkingLotsInfo,
  // fetchAvailableSpacesInfo,
} from '../../store/parkingLotsSlice';
import './Map.scss';
import ParkingLotsMarkerContainer from '../ParkingLotsMarkerContainer';

const Map = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchParkingLotsInfo());
  }, [dispatch]);

  return (
    <div id="map">
      <MapContainer center={LINE_TAIWAN} zoom={17} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <DestinationMarker />
        <ParkingLotsMarkerContainer />
      </MapContainer>
    </div>
  );
};

export default Map;
