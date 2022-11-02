import proj4 from 'proj4';
import { LatLngExpression } from 'leaflet';

proj4.defs([
  [
    'EPSG:4326', // 4326 = 經緯度 = wgs84
    '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees',
  ],
  [
    'EPSG:3826', // 3826 = TWD97
    '+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs',
  ],
  [
    'EPSG:3828',
    '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA',
  ],
]);

const transformCoord = ([y, x]: [number, number]): LatLngExpression => {
  const [lng, lat] = proj4('EPSG:3826', 'EPSG:4326', [y, x]);
  return [lat, lng];
};

export default transformCoord;
