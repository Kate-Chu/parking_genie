import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchAvailableSpacesInfo } from '../../store/parkingLotsSlice';
import ParkingLotsMarker from './ParkingLotMarker';
import transformCoord from '../../utils/transformCoord';
import type { ParkingLotsInfo } from '../../types';

const ParkingLotsMarkerContainer = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  dispatch(fetchAvailableSpacesInfo());

  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);

  const [mapBounds, setMapBounds] = useState(map.getBounds());
  const [nearbyParkingLots, setNearbyParkingLots] = useState<ParkingLotsInfo[]>([]);

  map.on('moveend', (e) => {
    setMapBounds(map.getBounds());
  });

  useEffect(() => {
    const list = parkingLotsInfo.filter((parkLot) => {
      const latLng = transformCoord([Number(parkLot.tw97x), Number(parkLot.tw97y)]);
      return mapBounds.contains(latLng);
    });
    setNearbyParkingLots(list);
  }, [mapBounds]);

  return (
    <>
      {nearbyParkingLots.map((data) => {
        return <ParkingLotsMarker data={data} key={data.id} />;
      })}
    </>
  );
};

export default ParkingLotsMarkerContainer;
