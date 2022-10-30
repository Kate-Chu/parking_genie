import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
// import { useAppSelector } from '../../store/hooks';
import LocationMarker from '../LocationMarker';
import ParkingLotsMarker from '../ParkingLotsMarker';
// import { userActions } from '../../store/useLocationStore';
import './Map.scss';

const data = {
  id: '001',
  area: '信義區',
  name: '府前廣場地下停車場',
  type: '1',
  type2: '2',
  summary: '為地下二層停車場，計有1998個小型車停車格，1337個機車停車位',
  address: '松壽路1號地下',
  tel: '27057716',
  payex:
    '小型車全日月票4200元，周邊里里民全日月票3360元，所在里里民全日月票2940元，夜間月票1000元(限周一至周五19-8，及周六、日與行政機關放假之紀念日、民俗日)，小型車計時30元(9-18)，夜間計時10元(18-9)；機車計時10元(當日當次上限20元)，機車月票300元。',
  serviceTime: '00:00:00~23:59:59',
  tw97x: '306812.928',
  tw97y: '2769892.95',
  totalcar: 1998,
  totalmotor: 1360,
  totalbike: 0,
  totalbus: 0,
  Pregnancy_First: '40',
  Handicap_First: '45',
  Taxi_OneHR_Free: '0',
  AED_Equipment: '0',
  CellSignal_Enhancement: '0',
  Accessibility_Elevator: '0',
  Phone_Charge: '0',
  Child_Pickup_Area: '0',
  FareInfo: {
    WorkingDay: [
      {
        Period: '00~09',
        Fare: '10',
      },
      {
        Period: '09~18',
        Fare: '30',
      },
      {
        Period: '18~24',
        Fare: '10',
      },
    ],
    Holiday: [
      {
        Period: '00~09',
        Fare: '10',
      },
      {
        Period: '09~18',
        Fare: '30',
      },
      {
        Period: '18~24',
        Fare: '10',
      },
    ],
  },
  EntranceCoord: {
    EntrancecoordInfo: [
      {
        Xcod: '25.03648987',
        Ycod: '121.5621068',
        Address: '基隆路一段',
      },
      {
        Xcod: '25.036014',
        Ycod: '121.563163',
        Address: '松壽路',
      },
      {
        Xcod: '25.035975',
        Ycod: '121.561532',
        Address: '基隆路一段車行地下道',
      },
    ],
  },
};

const Map = () => {
  // const currentLocation = useAppSelector((state) => state.user.user.currentLocation);
  const linePosition: LatLngExpression = [25.077227381690932, 121.5756255526039];

  return (
    <div id="map">
      <MapContainer center={linePosition} zoom={15} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <ParkingLotsMarker data={data} />
      </MapContainer>
    </div>
  );
};

export default Map;
