import React from 'react';
import L, { LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { ParkingLotsInfo } from '../../types';
import { useAppSelector } from '../../store';
import navigationUrlGenerator from '../../utils/navigationUrlGenerator';
import transformCoord from '../../utils/transformCoord';
import { LINE_TAIWAN } from '../../data/data';
import './ParkingLotMarker.scss';

type ParkingLotsMarkerProps = {
  data: ParkingLotsInfo;
};

const ParkingLotsMarker: React.FC<ParkingLotsMarkerProps> = (props) => {
  const { data } = props;
  const position: LatLngTuple = transformCoord([Number(data.tw97x), Number(data.tw97y)]);

  const userLocation = useAppSelector(
    (state) => state.user.userState.currentLocation.latLng,
  );
  const origin = userLocation || LINE_TAIWAN;

  const destinationPlaceId = useAppSelector(
    (state) => state.user.userState.destination.placeId,
  );

  const destination = {
    latLng: position,
    placeId: destinationPlaceId as string,
  };

  const availableSpacesInfo = useAppSelector(
    (state) => state.parkingLots.availableSpaces,
  );

  const updatedSpaces = availableSpacesInfo.find((availData) => availData.id === data.id);
  const availCarSpaces = updatedSpaces?.availablecar || '?';

  // set icon style
  let iconColor;

  if (availCarSpaces < 10) {
    iconColor = 'bg-red border-red';
  } else if (availCarSpaces >= 10 && availCarSpaces < 30) {
    iconColor = 'bg-yellow border-yellow';
  } else if (availCarSpaces >= 30) {
    iconColor = 'bg-primary border-primary';
  } else {
    iconColor = 'bg-gray-80 border-gray-80';
  }

  const icon = L.divIcon({
    className: 'div-icon-container',
    html: `<span class="${`div-icon ${iconColor}`}"><span class="div-icon__text ">${availCarSpaces}</span></span>`,
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup className="max-w-[250px]">
        <h1 className="text-base font-bold">{data.name}</h1>
        <section className="my-2 flex flex-col justify-between gap-1">
          <h6 className="text-sm">
            <strong>總車位</strong> {data.totalcar}
          </h6>
          <h6 className="text-sm">
            <strong>目前車位</strong> {availCarSpaces}
          </h6>
          <h6 className="text-sm">
            <strong>費率</strong> {data.payex}
          </h6>
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