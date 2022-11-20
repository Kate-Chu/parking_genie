import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../../layout/Sidebar';
import SearchForm from '../../components/SearchForm';
import LocationButton from '../../components/LocationButton';
import UserLocationMarker from '../../components/UserLocationMarker';
import DestinationMarker from '../../components/DestinationMarker';
import ParkingLotsMarkerContainer from '../../components/ParkingLotsMarkerContainer';
import AboutButton from '../../components/AboutButton';
import ToggleButton from '../../components/ToggleButton';
import FilterButton from '../../components/FilterButton';
import { useAppSelector, useAppDispatch } from '../../store';
import { userActions } from '../../store/userSlice';
import { LINE_TAIWAN } from '../../data/data';
import {
  fetchParkingLotsInfo,
  fetchAvailableSpacesInfo,
  parkingLotsActions,
} from '../../store/parkingLotsSlice';
import transformCoord from '../../utils/transformCoord';

const Homepage = () => {
  const [hoverMarkerId, setHoverMarkerId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector((state) => state.user.userState.showSidebar);
  const mapBounds = useAppSelector((state) => state.parkingLots.mapBounds);
  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);
  const hideUnknownSpacesLots = useAppSelector(
    (state) => state.parkingLots.hideUnknownSpacesLots,
  );

  useEffect(() => {
    dispatch(fetchParkingLotsInfo());
  }, [dispatch]);

  dispatch(fetchAvailableSpacesInfo());

  useEffect(() => {
    const list = parkingLotsInfo.filter((parkLot) => {
      const latLng = transformCoord([Number(parkLot.tw97x), Number(parkLot.tw97y)]);
      return mapBounds.contains(latLng);
    });
    dispatch(parkingLotsActions.setNearbyParkingLots(list));
  }, [mapBounds, dispatch, parkingLotsInfo, hideUnknownSpacesLots]);

  const toggleSidebarHandler = () => {
    dispatch(userActions.toggleSidebar());
  };

  const toggleHideUnknownSpacesLots = () => {
    dispatch(parkingLotsActions.toggleHideUnknownSpacesLots());
  };

  const mouseEnterHandler = (id: string) => {
    setHoverMarkerId(id);
  };

  return (
    <MapContainer center={LINE_TAIWAN} zoom={17} scrollWheelZoom doubleClickZoom={false}>
      <SearchForm />
      <FilterButton
        text={hideUnknownSpacesLots ? '顯示未知車位' : '隱藏未知車位'}
        onClick={toggleHideUnknownSpacesLots}
      />

      <ToggleButton atClick={toggleSidebarHandler} showSidebar={showSidebar} />
      {showSidebar && <Sidebar mouseEnterHandler={mouseEnterHandler} />}
      <div id="map" data-testid="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ToastContainer />
        <LocationButton />
        <UserLocationMarker />
        <DestinationMarker />
        <ParkingLotsMarkerContainer hoverMarkerId={hoverMarkerId} />
      </div>
      <AboutButton />
    </MapContainer>
  );
};

export default Homepage;
