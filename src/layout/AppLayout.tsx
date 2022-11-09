import { Outlet, useLocation } from 'react-router-dom';
import App from '../components/App';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      <Sidebar />
      {location.pathname === '/' ? <App /> : <Outlet />}
    </>
  );
};

export default AppLayout;
