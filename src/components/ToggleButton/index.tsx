import { memo } from 'react';
// import L from 'leaflet';
import { ReactComponent as ToggleIcon } from '../../assets/triangle.svg';

type ToggleButtonProps = {
  showSidebar: boolean;
  atClick: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { showSidebar, atClick } = props;

  return (
    <button
      id="toggle-sidebar-btn"
      className="fixed bottom-[50%] left-0 z-[1000] flex h-14 w-8 items-center justify-center rounded-r-lg border-t-2 border-r-2 border-b-2 border-t-light-100 border-r-light-100 border-b-light-100 bg-white hover:bg-light-100"
      onClick={atClick}
    >
      <ToggleIcon
        className={`h-5 w-4 rotate-[270deg] ${showSidebar ? null : 'rotate-90'}`}
        fill="#696974"
      />
    </button>
  );
};

export default memo(ToggleButton);
