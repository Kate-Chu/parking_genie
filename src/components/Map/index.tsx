import { MapContainer, TileLayer } from 'react-leaflet';

import { useAppSelector } from '../../store/hooks';
import LocationMarker from '../LocationMarker';
// import { userActions } from '../../store/useLocationStore';
import './Map.scss';

const Map = () => {
  const currentLocation = useAppSelector((state) => state.user.userInfo.currentLocation);

  return (
    <div id="map">
      <MapContainer center={currentLocation} zoom={15} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
