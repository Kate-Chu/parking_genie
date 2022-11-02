import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../../store/useTypedSelector';
// import { useAppSelector } from '../hooks/useTypedSelector';
import LocationMarker from '../LocationMarker';
import ParkingLotsMarker from '../ParkingLotsMarker';
import {
  fetchParkingLotsInfo,
  // fetchAvailableSpacesInfo,
} from '../../store/parkingLotsSlice';
import './Map.scss';

const Map = () => {
  const linePosition: LatLngExpression = [25.077227381690932, 121.5756255526039];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchParkingLotsInfo());
  }, [dispatch]);

  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);

  console.log('In Map, parkingLotsInfo: ', parkingLotsInfo);

  return (
    <div id="map">
      <MapContainer center={linePosition} zoom={15} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {parkingLotsInfo.slice(0, 20).map((data) => {
          return <ParkingLotsMarker data={data} key={data.id} />;
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
