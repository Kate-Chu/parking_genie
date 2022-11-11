import { memo } from 'react';
import purpleIcon from '../../assets/location-purple.png';
import redIcon from '../../assets/location-red.png';
import yellowIcon from '../../assets/location-yellow.png';
import blueIcon from '../../assets/location-blue.png';

const iconList = [
  { id: 'red', space: '小於 10 位', icon: redIcon },
  { id: 'yellow', space: '10 ~ 30 位', icon: yellowIcon },
  { id: 'blue', space: '大於 30 位', icon: blueIcon },
  { id: 'purple', space: '未知', icon: purpleIcon },
];

const IconIllustration = () => {
  return (
    <ul
      className="absolute bottom-10 left-10 z-[500] flex w-fit
     flex-col gap-4 rounded-lg bg-white p-4 shadow-md"
      data-testid="icon-illustration"
    >
      {iconList.map((item) => {
        return (
          <li className="flex items-center" key={item.id}>
            <span className="mr-2">
              <img src={item.icon} alt="space icon" className="h-6" />
            </span>
            <span>{item.space}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(IconIllustration);
