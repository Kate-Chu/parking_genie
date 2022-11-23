import './FilterUnknownButton.scss';

type FilterUnknownButtonProps = {
  text: string;
  onClick: () => void;
};

const FilterUnknownButton: React.FC<FilterUnknownButtonProps> = (props) => {
  const { text, onClick } = props;

  return (
    <button
      className="filter-button absolute left-2 top-32 z-[1000] w-10 rounded-full bg-white px-4 py-2 font-semibold md:left-96 md:top-6 md:w-28"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FilterUnknownButton;
