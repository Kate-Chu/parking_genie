import { MapContainer } from 'react-leaflet';
import { LINE_TAIWAN } from '../../data/data';
import Map from '../../components/Map';
import SearchForm from '../../components/SearchForm';
import Sidebar from '../../layout/Sidebar';
import AboutButton from '../../components/AboutButton';
import ToggleButton from '../../layout/Sidebar/ToggleButton';
import IconIllustration from '../../components/IconIllustration';
import { useAppSelector, useAppDispatch } from '../../store';
import { userActions } from '../../store/userSlice';

const Homepage = () => {
  const dispatch = useAppDispatch();

  const toggleSidebarHandler = () => {
    dispatch(userActions.toggleSidebar());
  };

  const showSidebar = useAppSelector((state) => state.user.userState.showSidebar);

  return (
    <MapContainer center={LINE_TAIWAN} zoom={17} scrollWheelZoom>
      <SearchForm />
      <ToggleButton atClick={toggleSidebarHandler} />
      {showSidebar && <Sidebar />}
      <Map />
      <IconIllustration />
      <AboutButton />
    </MapContainer>
  );
};
export default Homepage;
