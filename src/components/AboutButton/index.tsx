import { useNavigate } from 'react-router-dom';
import companyLogo from '../../assets/company-logo.jpg';

const AboutButton = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/about');
  };

  return (
    <button
      className="absolute bottom-10 right-10 z-[9999] h-16 w-16 rounded-full "
      title="About us"
      onClick={clickHandler}
      data-testid="about-button"
    >
      <img src={companyLogo} alt="company logo" className="rounded-full" />
    </button>
  );
};

export default AboutButton;
