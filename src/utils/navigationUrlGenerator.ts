import { LatLngTuple } from 'leaflet';

const navigationUrlGenerate = (
  origin: LatLngTuple,
  destination: { latLng: LatLngTuple; placeId: string },
) => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin[0]},${origin[1]}&destination=${destination.latLng[0]},${destination.latLng[1]}&destination_place_id=${destination.placeId}}`;
  return url;
};

export default navigationUrlGenerate;
