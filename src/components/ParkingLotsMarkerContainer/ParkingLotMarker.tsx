import React from 'react';
import L, { LatLngExpression } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { ParkingLotsInfo } from '../../types';
import { useAppSelector } from '../../store';
import transformCoord from '../../utils/transformCoord';
import locationBlackIcon from '../../assets/location-black.png';
import locationBlueIcon from '../../assets/location-blue.png';
import locationYellowIcon from '../../assets/location-yellow.png'; // O
import locationRedIcon from '../../assets/location-red.png'; // O

type ParkingLotsMarkerProps = {
  data: ParkingLotsInfo;
};

const ParkingLotsMarker: React.FC<ParkingLotsMarkerProps> = (props) => {
  const { data } = props;
  const position: LatLngExpression = transformCoord([
    Number(data.tw97x),
    Number(data.tw97y),
  ]);

  const availableSpacesInfo = useAppSelector(
    (state) => state.parkingLots.availableSpaces,
  );

  const updatedSpaces = availableSpacesInfo.find((availData) => availData.id === data.id);
  const availCarSpaces = updatedSpaces?.availablecar ? updatedSpaces?.availablecar : '？';
  let usedIcon;

  if (availCarSpaces < 10) {
    usedIcon = locationRedIcon;
  } else if (availCarSpaces >= 10 && availCarSpaces < 30) {
    usedIcon = locationYellowIcon;
  } else if (availCarSpaces >= 30) {
    usedIcon = locationBlueIcon;
  } else {
    usedIcon = locationBlackIcon;
  }

  const icon = L.icon({
    iconUrl: usedIcon,
    iconSize: [30, 30],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <h1 className="text-base font-bold">{data.name}</h1>
        <section className="my-2 flex justify-between">
          <h6 className="text-sm">總車位 {data.totalcar}</h6>
          <h6 className="text-sm">目前車位 {availCarSpaces}</h6>
        </section>
        <button className=" rounded-3xl bg-primary py-1.5 px-5 text-sm text-white">
          開始導航
        </button>
      </Popup>
    </Marker>
  );
};

export default ParkingLotsMarker;
