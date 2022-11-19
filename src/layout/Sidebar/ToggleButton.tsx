import { memo } from 'react';
import L from 'leaflet';
import { ReactComponent as ToggleIcon } from '../../assets/triangle.svg';

type ToggleButtonProps = {
  atClick: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { atClick } = props;

  const sidebar = L.DomUtil.get('toggle-sidebar-btn');
  if (sidebar) {
    L.DomEvent.on(sidebar, 'mousewheel', L.DomEvent.stopPropagation);
  }

  return (
    <button
      id="toggle-sidebar-btn"
      className=" fixed bottom-[50%] left-0 z-[1000] flex h-16 w-8 items-center justify-center rounded border-t-2 border-r-2 border-b-2 border-t-light-100 border-r-light-100 border-b-light-100 bg-white hover:bg-light-100"
      onClick={atClick}
    >
      <ToggleIcon className=" h-6 w-4 rotate-[270deg]" fill="#b5b5be" />
    </button>
  );
};

export default memo(ToggleButton);
