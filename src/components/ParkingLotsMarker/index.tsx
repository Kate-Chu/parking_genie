import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { ParkingLotsInfo } from '../../types';
import transformCoord from '../../utils/transformCoord';
// import { useAppSelector } from '../../store/hooks';

type ParkingLotsMarkerProps = {
  data: ParkingLotsInfo;
};

const ParkingLotsMarker: React.FC<ParkingLotsMarkerProps> = (props) => {
  // const ParkingLotsMarker = () => {
  const { data } = props;
  const position: LatLngExpression = transformCoord([
    Number(data.tw97x),
    Number(data.tw97y),
  ]);

  return (
    <Marker position={position}>
      <Popup>{data.name}</Popup>
    </Marker>
  );
};

export default ParkingLotsMarker;
