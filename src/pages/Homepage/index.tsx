import { useEffect } from 'react';
import { MapContainer } from 'react-leaflet';
import { LINE_TAIWAN } from '../../data/data';
import Map from '../../components/Map';
import SearchForm from '../../components/SearchForm';
import Sidebar from '../../layout/Sidebar';
import AboutButton from '../../components/AboutButton';
import ToggleButton from '../../layout/Sidebar/ToggleButton';
import { useAppSelector, useAppDispatch } from '../../store';
import { userActions } from '../../store/userSlice';
import {
  fetchAvailableSpacesInfo,
  parkingLotsActions,
} from '../../store/parkingLotsSlice';
import transformCoord from '../../utils/transformCoord';

const Homepage = () => {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector((state) => state.user.userState.showSidebar);
  const mapBounds = useAppSelector((state) => state.parkingLots.mapBounds);
  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);

  dispatch(fetchAvailableSpacesInfo());

  useEffect(() => {
    const list = parkingLotsInfo.filter((parkLot) => {
      const latLng = transformCoord([Number(parkLot.tw97x), Number(parkLot.tw97y)]);
      return mapBounds.contains(latLng);
    });
    dispatch(parkingLotsActions.setNearbyParkingLots(list));
  }, [mapBounds, dispatch, parkingLotsInfo]);

  const toggleSidebarHandler = () => {
    dispatch(userActions.toggleSidebar());
  };

  return (
    <MapContainer center={LINE_TAIWAN} zoom={17} scrollWheelZoom>
      <SearchForm />
      <ToggleButton atClick={toggleSidebarHandler} />
      {showSidebar && <Sidebar />}
      <Map />
      <AboutButton />
    </MapContainer>
  );
};

export default Homepage;
