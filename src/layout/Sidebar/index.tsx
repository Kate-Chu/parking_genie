import { memo } from 'react';
import { useAppSelector } from '../../store';
import LinkItem from './LinkItem';

const Sidebar = () => {
  const nearbyParkingLots = useAppSelector(
    (state) => state.parkingLots.nearbyParkingLots,
  );
  return (
    <aside className="absolute left-0 z-[999] h-screen w-3/12 min-w-min overflow-scroll rounded-lg bg-white py-4 pt-20 ">
      <section>
        {nearbyParkingLots.map((item) => {
          return <LinkItem {...item} key={item.id} />;
        })}
      </section>
    </aside>
  );
};

export default memo(Sidebar);
