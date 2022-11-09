import { useAppSelector } from '../../store';
import LinkItem from './LinkItem';

const Sidebar = () => {
  const nearbyParkingLots = useAppSelector(
    (state) => state.parkingLots.nearbyParkingLots,
  );
  return (
    <aside className="absolute left-0 z-[999] h-screen w-3/12 overflow-scroll ">
      <section className="h-20 bg-white">{null}</section>
      <section>
        {nearbyParkingLots.map((item) => {
          return <LinkItem {...item} key={item.id} />;
        })}
      </section>
    </aside>
  );
};

export default Sidebar;
