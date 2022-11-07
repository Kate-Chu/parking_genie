import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useAppSelector, useAppDispatch } from '../../store';
import {
  fetchAvailableSpacesInfo,
  parkingLotsActions,
} from '../../store/parkingLotsSlice';
import ParkingLotsMarker from './ParkingLotMarker';
import transformCoord from '../../utils/transformCoord';

const ParkingLotsMarkerContainer = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  dispatch(fetchAvailableSpacesInfo());

  map.on('moveend', (e) => {
    dispatch(parkingLotsActions.setMapBounds(map.getBounds()));
  });

  const mapBounds = useAppSelector((state) => state.parkingLots.mapBounds);
  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);

  useEffect(() => {
    const list = parkingLotsInfo.filter((parkLot) => {
      const latLng = transformCoord([Number(parkLot.tw97x), Number(parkLot.tw97y)]);
      return mapBounds.contains(latLng);
    });
    dispatch(parkingLotsActions.setNearbyParkingLots(list));
  }, [mapBounds, dispatch, parkingLotsInfo]);

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

export default ParkingLotsMarkerContainer;
