import { memo } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useAppSelector } from '../../store';
import LinkItem from './LinkItem';
import transformCoord from '../../utils/transformCoord';
import quickSort from '../../utils/quickSort';

type SidebarProps = {
  mouseEnterHandler: (id: string) => void;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { mouseEnterHandler } = props;
  const map = useMap();

  const userLocation = useAppSelector(
    (state) => state.user.userState.currentLocation.latLng,
  );

  const nearbyParkingLots = useAppSelector(
    (state) => state.parkingLots.nearbyParkingLots,
  );

  const distancedParkingLots = nearbyParkingLots.map((item) => {
    const latLng = transformCoord([Number(item.tw97x), Number(item.tw97y)]);
    let distanceFromOrigin = Infinity;
    if (userLocation) {
      const distance = map.distance(latLng, userLocation);
      distanceFromOrigin = Math.round(distance);
    }
    return { ...item, distanceFromOrigin };
  });

  const sortedParkingLots = quickSort(distancedParkingLots);

  const sidebar = L.DomUtil.get('sidebar');
  if (sidebar) {
    L.DomEvent.on(sidebar, 'mousewheel', (ev) => L.DomEvent.stopPropagation(ev));
  }

  return (
    <aside
      id="sidebar"
      className="absolute left-0 z-[999] h-screen w-screen min-w-min overflow-scroll rounded-lg bg-white py-4 pt-20 md:w-[40%] lg:w-[26%] "
    >
      {sortedParkingLots.map((item) => {
        return (
          <LinkItem
            parkingLotInfo={item}
            key={item.id}
            mouseEnterHandler={mouseEnterHandler}
          />
        );
      })}
    </aside>
  );
};

export default memo(Sidebar);
