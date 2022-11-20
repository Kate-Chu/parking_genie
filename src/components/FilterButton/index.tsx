type FilterButtonProps = {
  text: string;
  onClick: () => void;
};

const FilterButton: React.FC<FilterButtonProps> = (props) => {
  const { text, onClick } = props;

  return (
    <button className="z-[1000] bg-red" onClick={onClick}>
      {text}
    </button>
  );
};

export default FilterButton;
