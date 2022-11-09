import { Link } from 'react-router-dom';
import companyLogo from '../../assets/company-logo.jpg';
import mapLogo from '../../assets/map.png';
import './about.scss';

const About = () => {
  return (
    <main className="about-page flex h-screen w-screen items-center overflow-hidden text-gray-120">
      <section className="about-page__intro ml-32 w-4/6 tracking-wider">
        <h1 className="my-8 flex items-center text-5xl font-black">
          Your Parking Genie
          <span>
            <img
              src={companyLogo}
              alt="company logo"
              className="ml-8 inline-block h-16 w-16 rounded-full"
            />
          </span>
        </h1>
        <p className="text-xl font-semibold">
          停車小精靈為您找到距離最近的停車場，讓您開車出門不再煩惱找不到停車位。
          <br />
          停車的大小事，都交給我們。：）
        </p>
        <Link to="/" className="mt-8 flex w-fit items-end">
          <img
            src={mapLogo}
            alt="map logo"
            className="inline-block h-16 w-16"
            title="back to map"
          />
          <span className="ml-4 mb-2 font-medium text-gray-80">&crarr; 回到地圖</span>
        </Link>
      </section>
      <section className="decoration">
        <div className="circle circle-a" />
        <div className="circle circle-b" />
      </section>
    </main>
  );
};

export default About;
