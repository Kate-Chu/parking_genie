import { memo } from 'react';
import { useMap } from 'react-leaflet';
import { useAppSelector, useAppDispatch } from '../../store';
import { parkingLotsActions } from '../../store/parkingLotsSlice';
import ParkingLotsMarker from './ParkingLotMarker';

const ParkingLotsMarkerContainer = () => {
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
        return <ParkingLotsMarker data={data} key={data.id} />;
      })}
    </>
  );
};

export default memo(ParkingLotsMarkerContainer);
