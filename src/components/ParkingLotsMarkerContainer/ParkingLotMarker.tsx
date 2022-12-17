import React from 'react';
import L, { LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { ParkingLotsInfo } from '../../types';
import { useAppSelector } from '../../store';
import navigationUrlGenerator from '../../utils/navigationUrlGenerator';
import transformCoord from '../../utils/transformCoord';
import { TAIPEI_TRANE_STATION } from '../../data/data';
import './ParkingLotMarker.scss';

type ParkingLotsMarkerProps = {
  data: ParkingLotsInfo;
  isHovered: boolean;
};

const ParkingLotsMarker: React.FC<ParkingLotsMarkerProps> = (props) => {
  const { data, isHovered } = props;
  const position: LatLngTuple = transformCoord([Number(data.tw97x), Number(data.tw97y)]);

  const userLocation = useAppSelector((state) => state.user.currentLocation.latLng);
  const origin = userLocation || TAIPEI_TRANE_STATION;

  const destinationPlaceId = useAppSelector((state) => state.user.destination.placeId);

  const destination = {
    latLng: position,
    placeId: destinationPlaceId as string,
  };

  const availableSpacesInfo = useAppSelector(
    (state) => state.parkingLots.availableSpaces,
  );

  const updatedSpaces = availableSpacesInfo.find((availData) => availData.id === data.id);
  const availCarSpaces =
    updatedSpaces?.availablecar && updatedSpaces.availablecar >= 0
      ? updatedSpaces?.availablecar
      : '?';

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
    className: isHovered ? 'div-icon-container hovered !z-[999]' : 'div-icon-container',
    html: `<span class="${`div-icon ${iconColor} 
    ${isHovered && 'hovered'}
    `}"><span class="div-icon__text">${availCarSpaces}</span></span>`,
  });

  return (
    <Marker position={position} icon={icon} riseOnHover>
      <Popup
        className="z-[10000] max-w-[200px] md:max-w-[250px]"
        autoPanPadding={L.point(5, 5)}
      >
        <h1 className=" text-xs font-bold md:text-base">{data.name}</h1>
        <section className="my-2 flex flex-col justify-between gap-1">
          <h6 className="text-xs md:text-sm">
            <strong>總車位</strong> {data.totalcar}
          </h6>
          <h6 className="text-xs md:text-sm">
            <strong>目前車位</strong> {availCarSpaces}
          </h6>
          <h6 className="text-xs md:text-sm">
            <strong>費率</strong> {data.payex}
          </h6>
        </section>
        <button className=" w-full rounded-3xl bg-primary py-1.5 px-5 text-xs md:text-sm">
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
