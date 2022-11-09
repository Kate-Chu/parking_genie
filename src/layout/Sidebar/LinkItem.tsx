// import { useAppSelector } from '../../store';
import type { ParkingLotsInfo as ParkingLotsInfoType } from '../../types';

// type ParkingLotsMarkerProps = { data: ParkingLotsInfoType };

const LinkItem: React.FC<ParkingLotsInfoType> = (props) => {
  const { name } = props;
  // const availableSpaces = useAppSelector((state) => state.parkingLots.availableSpaces);
  // const availableSpacesCount = availableSpaces.find((item) => item.id === id);

  return (
    <>
      <section>
        <h1 className="h-20 bg-light-100 hover:bg-white">{name}</h1>
        {/* <span className="text-sm">剩餘車位 {availableSpacesCount || '?'}</span> */}
      </section>
      <button>規劃路線</button>
    </>
  );
};

export default LinkItem;
