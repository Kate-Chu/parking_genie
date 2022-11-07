import { Outlet, useLocation, redirect } from 'react-router-dom';

const Root = () => {
  const location = useLocation();
  if (location.pathname === '/') redirect('/map');

  return (
    <div id="container">
      <Outlet />
    </div>
  );
};

export default Root;
