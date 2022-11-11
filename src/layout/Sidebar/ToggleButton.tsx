import { memo } from 'react';
import { ReactComponent as ToggleIcon } from '../../assets/triangle.svg';

type ToggleButtonProps = {
  atClick: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { atClick } = props;
  return (
    <button
      className="fixed bottom-[50%] left-0 z-[9999] flex h-16 w-12 items-center justify-center rounded bg-white hover:bg-light-100"
      onClick={atClick}
    >
      <ToggleIcon className=" h-12 w-8 rotate-[270deg]" fill="#d8d8d8" />
    </button>
  );
};

export default memo(ToggleButton);
