import { memo } from 'react';
import { useMap } from 'react-leaflet';
import { useAppSelector } from '../../store';
import { ReactComponent as LocationCrossIcon } from '../../assets/location-crosshairs.svg';

const LocationButton = () => {
  const map = useMap();
  const currentLocation = useAppSelector(
    (state) => state.user.userState.currentLocation.latLng,
  );

  const userLocationHandler = () => {
    if (currentLocation) {
      map.flyTo(currentLocation, map.getZoom());
    }
  };
  return (
    <button
      className="location-btn absolute top-20 left-3 z-[1000] flex h-8 w-8 items-center justify-center rounded-md border-[1.5px] border-gray-60 bg-white"
      title="My location"
      onClick={userLocationHandler}
    >
      <LocationCrossIcon fill="#003060" className="h-5 w-5" />
    </button>
  );
};

export default memo(LocationButton);
