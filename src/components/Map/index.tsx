import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LINE_TAIWAN } from '../../data/default_data';
import { useAppDispatch, useAppSelector } from '../../store';
import LocationMarker from '../LocationMarker';
import DestinationMarker from '../Destination';
import ParkingLotsMarker from '../ParkingLotsMarker';
import {
  fetchParkingLotsInfo,
  // fetchAvailableSpacesInfo,
} from '../../store/parkingLotsSlice';
import './Map.scss';

const Map = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchParkingLotsInfo());
  }, [dispatch]);

  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);

  return (
    <div id="map">
      <MapContainer center={LINE_TAIWAN} zoom={15} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <DestinationMarker />
        {parkingLotsInfo.slice(0, 20).map((data) => {
          return <ParkingLotsMarker data={data} key={data.id} />;
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
