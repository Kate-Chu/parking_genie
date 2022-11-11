import React from 'react';
import L, { LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { ParkingLotsInfo } from '../../types';
import { useAppSelector } from '../../store';
import navigationUrlGenerator from '../../utils/navigationUrlGenerator';
import transformCoord from '../../utils/transformCoord';
import locationPurpleIcon from '../../assets/location-purple.png';
import locationBlueIcon from '../../assets/location-blue.png';
import locationYellowIcon from '../../assets/location-yellow.png';
import locationRedIcon from '../../assets/location-red.png';
import { LINE_TAIWAN } from '../../data/data';

type ParkingLotsMarkerProps = {
  data: ParkingLotsInfo;
};

const ParkingLotsMarker: React.FC<ParkingLotsMarkerProps> = (props) => {
  const { data } = props;
  const position: LatLngTuple = transformCoord([Number(data.tw97x), Number(data.tw97y)]);

  const userLocation = useAppSelector(
    (state) => state.user.userState.currentLocation.latLng,
  );

  const destinationPlaceId = useAppSelector(
    (state) => state.user.userState.destination.placeId,
  );

  const origin = userLocation || LINE_TAIWAN;

  const destination = {
    latLng: position,
    placeId: destinationPlaceId as string,
  };

  const availableSpacesInfo = useAppSelector(
    (state) => state.parkingLots.availableSpaces,
  );

  const updatedSpaces = availableSpacesInfo.find((availData) => availData.id === data.id);
  const availCarSpaces = updatedSpaces?.availablecar ? updatedSpaces?.availablecar : '?';
  let usedIcon;

  if (availCarSpaces < 10) {
    usedIcon = locationRedIcon;
  } else if (availCarSpaces >= 10 && availCarSpaces < 30) {
    usedIcon = locationYellowIcon;
  } else if (availCarSpaces >= 30) {
    usedIcon = locationBlueIcon;
  } else {
    usedIcon = locationPurpleIcon;
  }

  const icon = L.icon({
    iconUrl: usedIcon,
    iconSize: [30, 30],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup className="max-w-[200px]">
        <h1 className="text-base font-bold">{data.name}</h1>
        <section className="my-2 flex justify-between gap-1">
          <h6 className="text-sm">總車位 {data.totalcar}</h6>
          <h6 className="text-sm">目前車位 {availCarSpaces}</h6>
        </section>
        <button className=" w-full rounded-3xl bg-primary py-1.5 px-5 text-sm">
          <a
            href={navigationUrlGenerator(origin, destination)}
            target="_blank"
            rel="noreferrer"
            className="navigation__btn__a !text-white"
          >
            開始導航
          </a>
        </button>
      </Popup>
    </Marker>
  );
};

export default React.memo(ParkingLotsMarker);
