// import L from 'leaflet';
import { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useAppSelector } from '../../store';
import transformCoord from '../../utils/transformCoord';
import type { ParkingLotsInfo } from '../../types';
// import ParkingLotsMarker from './ParkingLotMarker';

const ParkingLotsMarkerContainer = () => {
  const map = useMap();
  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);
  const [mapBounds, setMapBounds] = useState(map.getBounds());
  const [nearbyParkingLots, setNearbyParkingLots] = useState<ParkingLotsInfo[]>([]);

  map.on('moveend', (e) => {
    setMapBounds(map.getBounds());
  });

  useEffect(() => {
    console.log('parkingLotsInfo', parkingLotsInfo); // yes
    const list = parkingLotsInfo.filter((parkLot) => {
      const latLng = transformCoord([Number(parkLot.tw97x), Number(parkLot.tw97y)]);
      return mapBounds.contains(latLng);
    });
    setNearbyParkingLots(list);
  }, [mapBounds, parkingLotsInfo]);

  nearbyParkingLots.map((data) => {
    const position = transformCoord([Number(data.tw97x), Number(data.tw97y)]);

    return (
      <Marker position={position}>
        <Popup>{data.name}</Popup>
      </Marker>
    );
  });

  return (
    <>
      {nearbyParkingLots.map((data) => {
        const position = transformCoord([Number(data.tw97x), Number(data.tw97y)]);

        return (
          <Marker position={position}>
            <Popup>{data.name}</Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default ParkingLotsMarkerContainer;
