type CardProps = {
  tailwind: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ tailwind, children }) => {
  return <div className={tailwind}>{children}</div>;
};

export default Card;
