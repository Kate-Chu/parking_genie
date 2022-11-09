import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <span className="hidden">Test</span>
      <Outlet />
    </>
  );
};

export default AppLayout;
