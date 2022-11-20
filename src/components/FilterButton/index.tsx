import './FilterButton.scss';

type FilterButtonProps = {
  text: string;
  onClick: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = (props) => {
  const { text, onClick } = props;

  return (
    <button
      className="filter-button absolute left-96 top-6 z-[1000] rounded-full bg-white px-4 py-2 font-semibold"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FilterButton;
