import { LatLngBounds } from 'leaflet';
import parkingLotsReducer, {
  type ParkingLotsState,
  parkingLotsActions,
} from './parkingLotsSlice';

describe('parking lots reducer', () => {
  const state: ParkingLotsState = {
    parkingLotsInfo: [],
    availableSpaces: [
      {
        id: '1',
        availablecar: 12,
        availablemotor: 12,
        availablebus: 12,
      },
    ],
    nearbyParkingLots: [],
    mapBounds: {} as LatLngBounds,
    hideUnknownSpacesLots: true,
  };
  test('should return initial state', () => {
    const initialState: ParkingLotsState = state;
    const action = { type: 'unknown' };
    const expectedState = initialState;
    expect(parkingLotsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle toggleUnknownSpacesLots', () => {
    const initialState: ParkingLotsState = state;
    const action = parkingLotsActions.toggleUnknownSpacesLots();
    const expectedState = { ...state, hideUnknownSpacesLots: false };
    expect(parkingLotsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle setMapBounds', () => {
    const initialState: ParkingLotsState = state;
    const mapBounds = {
      _northEast: {
        lat: 25.085268523963748,
        lng: 121.59127235412599,
      },
      _southWest: {
        lat: 25.069234640144305,
        lng: 121.56037330627443,
      },
    };
    const action = parkingLotsActions.setMapBounds(mapBounds);
    const expectedState = { ...state, mapBounds };
    expect(parkingLotsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle setNearbyParkingLots', () => {
    const parkingLotsInfo = [
      {
        id: '001',
        area: '信義區',
        name: '府前廣場地下停車場',
        type: '1',
        type2: '2',
        summary: '為地下二層停車場，計有1998個小型車停車格，1337個機車停車位',
        address: '松壽路1號地下',
        tel: '27057716',
        payex:
          '小型車全日月票4200元，夜間月票1000元(限周一至周五19-8，及周六、日與行政機關放假之紀念日、民俗日)，小型車計時30元(9-18)，夜間計時10元(18-9)；機車計時10元(當日當次上限20元)，機車月票300元。111/11/26、11/27、12/3、12/4、12/10、12/11、12/17、12/18、12/24、12/25、12/31、112/1/1、1/2、1/8、1/14、1/15，10-20時，調整小型車費率，計時60元。',
        serviceTime: '00:00:00~23:59:59',
        tw97x: '306812.928',
        tw97y: '2769892.95',
        totalcar: 2043,
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
      },
    ];
    const initialState: ParkingLotsState = { ...state, parkingLotsInfo };
    const action = parkingLotsActions.setNearbyParkingLots(parkingLotsInfo);
    const expectedState = { ...state, nearbyParkingLots: parkingLotsInfo };
    const result = parkingLotsReducer(initialState, action);
    expect(result.availableSpaces[0].id).toEqual(expectedState.availableSpaces[0].id);
  });
});
