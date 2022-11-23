import type { autoComplete } from '../../types';

type AutoCompleteListProps = {
  data: autoComplete;
  onClick: (text: string) => void;
  onMouseEnter: (text: string) => void;
};

const AutoCompleteList: React.FC<AutoCompleteListProps> = (props) => {
  const { data, onClick, onMouseEnter } = props;

  return (
    <li className="z-[1000] flex h-8 w-[18rem] flex-wrap items-center bg-white py-4 text-xs text-gray-80 hover:bg-light-60 hover:text-blue">
      <button
        onClick={() => onClick(data.label)}
        onMouseEnter={() => onMouseEnter(data.label)}
      >
        {data.label}
      </button>
    </li>
  );
};

export default AutoCompleteList;
