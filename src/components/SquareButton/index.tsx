import { memo } from 'react';

type SquareButtonProps = {
  position: string;
  icon: JSX.Element;
  title: string;
  clickHandler: () => void;
};

const SquareButton: React.FC<SquareButtonProps> = (props) => {
  const { position, icon, title, clickHandler } = props;

  return (
    <button
      className={`location-btn z-[1000] flex h-8 w-8 items-center justify-center rounded-md border-[1.5px] border-gray-60 bg-white ${position}`}
      title={title}
      onClick={clickHandler}
    >
      {icon}
    </button>
  );
};

export default memo(SquareButton);
