import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { ParkingLotsInfo } from '../../types';
// import { useAppSelector } from '../../store/hooks';

type ParkingLotsMarkerProps = {
  data: ParkingLotsInfo;
};

const ParkingLotsMarker: React.FC<ParkingLotsMarkerProps> = (props) => {
  // const ParkingLotsMarker = () => {
  const { data } = props;
  console.log(data);
  const location: LatLngExpression = [25.03648987, 121.5621068];

  return (
    <Marker position={location}>
      <Popup>Your current location</Popup>
    </Marker>
  );
};

export default ParkingLotsMarker;
