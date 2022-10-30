const proj4 = require('proj4');

proj4.defs([
  [
    'EPSG:4326',
    '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees',
  ],
  [
    'EPSG:3826',
    '+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs',
  ],
  [
    'EPSG:3828',
    '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA',
  ],
]);

const transformCoord = ([x, y]: [number, number]) => {
  return proj4(proj4('EPSG:3826'), proj4('EPSG:4326'), [x, y]); // 3826 轉 4326 (TWD97 轉經緯度)
};

export default transformCoord;
