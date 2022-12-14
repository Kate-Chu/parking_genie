import { memo } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../../assets/company-logo.jpg';
import mapLogo from '../../assets/map.png';
import abstractShape from '../../assets/orange-1.png';
import './about.scss';

const About = () => {
  return (
    <main className="about-page flex h-screen w-screen items-center overflow-hidden text-gray-120">
      <section className="about-page__intro w-4/6 tracking-wider">
        <section className="about-page__header flex items-center">
          <h1 className="about-page__text my-8 flex items-center text-5xl font-black">
            Parking Genie
          </h1>
          <span className="about-page__logo">
            <img
              src={companyLogo}
              alt="company logo"
              className="ml-8 inline-block h-16 w-16 rounded-full"
            />
          </span>
        </section>
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
      <img
        src={abstractShape}
        alt="abstract shape"
        className="absolute top-[-10%] left-[-20%] h-2/5 w-2/5 -rotate-[-20]"
      />
      <img
        src={abstractShape}
        alt="abstract shape"
        className="absolute bottom-[-10%] right-[-20%] h-2/5 w-2/5 rotate-180"
      />
    </main>
  );
};

export default memo(About);
