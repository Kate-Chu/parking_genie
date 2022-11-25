import { memo } from 'react';
import { LatLngTuple } from 'leaflet';
import { useAppSelector } from '../../store';
import { ReactComponent as NavigationIcon } from '../../assets/navigation.svg';
import { LINE_TAIWAN } from '../../data/data';
import transformCoord from '../../utils/transformCoord';
import navigationUrlGenerator from '../../utils/navigationUrlGenerator';
import type { ParkingLotsInfo as ParkingLotsInfoType } from '../../types';

type LinkItemProps = {
  parkingLotInfo: ParkingLotsInfoType;
  mouseEnterHandler: (id: string) => void;
};

const LinkItem: React.FC<LinkItemProps> = (props) => {
  const { parkingLotInfo, mouseEnterHandler } = props;
  const { name, id, address, tw97x, tw97y, distanceFromOrigin, payex } = parkingLotInfo;
  const availableSpaces = useAppSelector((state) => state.parkingLots.availableSpaces);
  const availableSpacesCount = availableSpaces.find((item) => item.id === id);
  const position: LatLngTuple = transformCoord([Number(tw97x), Number(tw97y)]);

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

  return (
    <li
      className="flex cursor-default items-center justify-between rounded-xl bg-white pl-16 pr-6 hover:bg-light-80"
      onMouseEnter={() => mouseEnterHandler(id)}
      onMouseLeave={() => mouseEnterHandler('')}
    >
      <li className="w-5/6 border-b-[1px] border-gray-40 py-6 pr-2">
        <h1 className="text-lg font-bold">{name}</h1>
        <p className="text-sm">{address}</p>
        <section className="flex flex-col justify-between">
          <p className="text-sm">
            <strong>剩餘車位</strong>
            <span
              className={`ml-2 font-semibold text-blue
              ${
                availableSpacesCount?.availablecar &&
                availableSpacesCount?.availablecar > 999
                  ? 'text-md'
                  : 'text-lg'
              } `}
            >
              {availableSpacesCount?.availablecar || '?'}
            </span>
          </p>
          <p className="text-sm">
            <strong>距離</strong>
            <span className="ml-2">
              <span className="mr-2 text-lg font-semibold text-green">
                {distanceFromOrigin ? (distanceFromOrigin / 1000).toFixed(2) : '?'}
              </span>
              公里
            </span>
          </p>
          <p className="text-sm">
            <strong>費率</strong>
            <span className="ml-2">{payex}</span>
          </p>
        </section>
      </li>
      <button className="h-8 w-8 rounded-full border-[1px] border-blue-icon text-center">
        <a
          href={navigationUrlGenerator(origin, destination)}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <NavigationIcon fill="#1a73e8" className="mx-auto h-4 w-4" />
          </span>
        </a>
      </button>
    </li>
  );
};

export default memo(LinkItem);
