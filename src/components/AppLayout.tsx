import { Outlet, useLocation } from 'react-router-dom';
import Map from './Map';

const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      <span className="hidden">Test</span>
      {location.pathname === '/' ? <Map /> : <Outlet />}
    </>
  );
};

export default AppLayout;
