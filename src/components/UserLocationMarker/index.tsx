import { memo } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../store';

import carIcon from '../../assets/car.png';
import './UserLocationMarker.scss';

const UserLocationMarker = () => {
  const map = useMap();

  const icon = L.icon({
    iconUrl: carIcon,
    iconSize: [45, 45],
  });

  const currentLocation = useAppSelector((state) => state.user.currentLocation.latLng);
  const isRealLocation = useAppSelector(
    (state) => state.user.currentLocation.isRealLocation,
  );

  if (currentLocation && !isRealLocation) {
    toast.info(
      '很抱歉，目前僅提供台北市內的服務，偵測您目前位於外縣市，我們將為您導向臺北車站',
      { delay: 200, bodyClassName: 'toast-body', position: 'bottom-center' },
    );

    map.flyTo(currentLocation, map.getZoom());
  }

  return currentLocation === undefined ? null : (
    <Marker position={currentLocation} icon={icon} data-testid="user-location-marker">
      <Popup>
        <h1 className="text-base font-bold">目前位置</h1>
      </Popup>
    </Marker>
  );
};

export default memo(UserLocationMarker);
