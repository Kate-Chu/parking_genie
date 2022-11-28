import { useState, useEffect, useCallback } from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../../layout/Sidebar';
import SearchForm from '../../components/SearchForm';
import SquareButton from '../../components/SquareButton';
import UserLocationMarker from '../../components/UserLocationMarker';
import DestinationMarker from '../../components/DestinationMarker';
import ParkingLotsMarkerContainer from '../../components/ParkingLotsMarkerContainer';
import AboutButton from '../../components/AboutButton';
import ToggleButton from '../../components/ToggleButton';
import Card from '../../components/Card';
import Modal from '../../layout/Modal';
import useModal from '../../hooks/useModal';
import { ReactComponent as LocationCrossIcon } from '../../assets/location-crosshairs.svg';
import { ReactComponent as DollarIcon } from '../../assets/dollar.svg';
import { ReactComponent as QuestionIcon } from '../../assets/question.svg';
import linePayLogo from '../../assets/line-pay.png';
import { useAppSelector, useAppDispatch } from '../../store';
import {
  fetchParkingLotsInfo,
  fetchAvailableSpacesInfo,
  parkingLotsActions,
} from '../../store/parkingLotsSlice';
import transformCoord from '../../utils/transformCoord';

const Homepage = () => {
  const [hoverMarkerId, setHoverMarkerId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const mapBounds = useAppSelector((state) => state.parkingLots.mapBounds);
  const parkingLotsInfo = useAppSelector((state) => state.parkingLots.parkingLotsInfo);
  const hideUnknownSpacesLots = useAppSelector(
    (state) => state.parkingLots.hideUnknownSpacesLots,
  );
  const { isOpen, toggleModal } = useModal();

  const locateBtnIcon = <LocationCrossIcon fill="#003060" className="h-5 w-5" />;
  const questionIcon = <QuestionIcon fill="#003060" className="h-5 w-5" />;
  const payBtnIcon = <DollarIcon fill="#003060" className="h-5 w-5" />;

  useEffect(() => {
    dispatch(fetchParkingLotsInfo());
    dispatch(fetchAvailableSpacesInfo());

    const interval = setInterval(() => {
      dispatch(fetchAvailableSpacesInfo());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const list = parkingLotsInfo.filter((parkLot) => {
      const latLng = transformCoord([Number(parkLot.tw97x), Number(parkLot.tw97y)]);
      return mapBounds.contains(latLng);
    });
    dispatch(parkingLotsActions.setNearbyParkingLots(list));
  }, [mapBounds, dispatch, parkingLotsInfo, hideUnknownSpacesLots]);

  const map = useMap();
  const currentLocation = useAppSelector((state) => state.user.currentLocation.latLng);

  const toggleSidebarHandler = useCallback((input: boolean) => {
    setShowSidebar(input);
  }, []);

  const userLocationHandler = useCallback(() => {
    if (currentLocation) {
      map.flyTo(currentLocation, map.getZoom());
    }
  }, [currentLocation, map]);

  const toggleUnknownSpacesLots = useCallback(() => {
    dispatch(parkingLotsActions.toggleUnknownSpacesLots());
  }, [dispatch]);

  const mouseEnterHandler = useCallback((id: string) => {
    setHoverMarkerId(id);
  }, []);

  return (
    <>
      <SearchForm toggleSidebarHandler={toggleSidebarHandler} />
      <ToggleButton atClick={toggleSidebarHandler} showSidebar={showSidebar} />
      {showSidebar && <Sidebar mouseEnterHandler={mouseEnterHandler} />}
      <div id="map" data-testid="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ToastContainer position="bottom-center" />
        <SquareButton
          position="absolute top-20 left-3"
          icon={locateBtnIcon}
          title="My location"
          dataTestId="locateBtn"
          clickHandler={userLocationHandler}
        />
        <SquareButton
          position="absolute top-[7.5rem] left-3"
          icon={questionIcon}
          title="Pay Parking Fee"
          dataTestId="toggleUnknownBtn"
          clickHandler={toggleUnknownSpacesLots}
        />
        <SquareButton
          position="absolute top-40 left-3"
          dataTestId="payBtn"
          icon={payBtnIcon}
          title="Pay Parking Fee"
          clickHandler={toggleModal}
        />
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <Card tailwind="bg-white cursor-pointer flex items-center justify-center w-60 h-40 rounded-md text-lg flex-col px-4 ">
            <p>+ 新增信用卡</p>
            <p>或簽帳金融卡</p>
          </Card>
          <Card tailwind="bg-white cursor-pointer flex items-center justify-center w-60 h-40 rounded-md text-lg">
            +{' '}
            <img
              src={linePayLogo}
              alt="line pay"
              data-testid="linePay"
              className="w-1/2 pl-4"
            />
          </Card>
        </Modal>
        <UserLocationMarker />
        <DestinationMarker />
        <ParkingLotsMarkerContainer hoverMarkerId={hoverMarkerId} />
      </div>
      <AboutButton />
    </>
  );
};

export default Homepage;
