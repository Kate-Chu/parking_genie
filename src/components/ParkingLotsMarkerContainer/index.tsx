import { memo } from 'react';
import { useMap } from 'react-leaflet';
import { useAppSelector, useAppDispatch } from '../../store';
import { parkingLotsActions } from '../../store/parkingLotsSlice';
import ParkingLotsMarker from './ParkingLotMarker';

type ParkingLotsMarkerContainerProps = {
  hoverMarkerId: string | null;
};

const ParkingLotsMarkerContainer: React.FC<ParkingLotsMarkerContainerProps> = (props) => {
  const { hoverMarkerId } = props;
  const map = useMap();
  const dispatch = useAppDispatch();

  map.on('moveend', () => {
    dispatch(parkingLotsActions.setMapBounds(map.getBounds()));
  });

  const nearbyParkingLots = useAppSelector(
    (state) => state.parkingLots.nearbyParkingLots,
  );

  return (
    <>
      {nearbyParkingLots.map((data) => {
        return (
          <ParkingLotsMarker
            data={data}
            key={data.id}
            isHovered={hoverMarkerId === data.id}
          />
        );
      })}
    </>
  );
};

export default memo(ParkingLotsMarkerContainer);
