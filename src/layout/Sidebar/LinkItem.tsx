import { memo } from 'react';
import { LatLngTuple } from 'leaflet';
import { useAppSelector } from '../../store';
import { ReactComponent as NavigationIcon } from '../../assets/navigation.svg';
import { LINE_TAIWAN } from '../../data/data';
import transformCoord from '../../utils/transformCoord';
import navigationUrlGenerator from '../../utils/navigationUrlGenerator';
import type { ParkingLotsInfo as ParkingLotsInfoType } from '../../types';

const LinkItem: React.FC<ParkingLotsInfoType> = (props) => {
  const { name, id, address, tw97x, tw97y, distanceFromOrigin } = props;
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
    <section className="flex items-center justify-between rounded-xl bg-white pl-16 pr-4 hover:bg-light-80">
      <section className="my-8 w-4/5 pr-2">
        <h1 className="text-lg font-bold">{name}</h1>
        <p className="text-sm">{address}</p>
        <section className="flex justify-between">
          <p className="text-sm">
            剩餘車位
            <span className="ml-4 text-lg font-semibold text-blue">
              {availableSpacesCount?.availablecar || '?'}
            </span>
          </p>
          <p className="text-sm">
            距離
            <span className="ml-4   ">
              <span className="mr-4 text-lg font-semibold text-green">
                {(distanceFromOrigin! / 1000).toFixed(2) || '?'}
              </span>
              公里
            </span>
          </p>
        </section>
      </section>
      <button className="h-12 w-12  rounded-full border-[1px] border-gray-100">
        <a
          href={navigationUrlGenerator(origin, destination)}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <NavigationIcon fill="#657786" className="mx-auto h-6 w-6" />
          </span>
        </a>
      </button>
    </section>
  );
};

export default memo(LinkItem);
