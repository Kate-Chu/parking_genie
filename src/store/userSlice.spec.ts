import userReducer, { type UserState } from './userSlice';

// const FAKE_USER_CURRENT_LOCATION = {
//   plus_code: {
//     compound_code: 'X6V5+62R 台灣台南市中西區',
//     global_code: '7QJ2X6V5+62R',
//   },
//   results: [
//     {
//       address_components: [
//         {
//           long_name: '16',
//           short_name: '16',
//           types: ['street_number'],
//         },
//         {
//           long_name: '衛民街143巷',
//           short_name: '衛民街143巷',
//           types: ['route'],
//         },
//         {
//           long_name: '青年里',
//           short_name: '青年里',
//           types: ['administrative_area_level_4', 'political'],
//         },
//         {
//           long_name: '中西區',
//           short_name: '中西區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//         {
//           long_name: '700',
//           short_name: '700',
//           types: ['postal_code'],
//         },
//       ],
//       formatted_address: '700台灣台南市中西區衛民街143巷16號',
//       geometry: {
//         location: {
//           lat: 22.9930526,
//           lng: 120.2075616,
//         },
//         location_type: 'ROOFTOP',
//         viewport: {
//           northeast: {
//             lat: 22.9944015802915,
//             lng: 120.2089105802915,
//           },
//           southwest: {
//             lat: 22.9917036197085,
//             lng: 120.2062126197085,
//           },
//         },
//       },
//       place_id: 'ChIJv3WOr4l2bjQRAXpuqrpinTc',
//       plus_code: {
//         compound_code: 'X6V5+62 台灣台南市中西區',
//         global_code: '7QJ2X6V5+62',
//       },
//       types: ['street_address'],
//     },
//     {
//       address_components: [
//         {
//           long_name: '11號',
//           short_name: '11號',
//           types: ['street_number'],
//         },
//         {
//           long_name: '衛民街143巷',
//           short_name: '衛民街143巷',
//           types: ['route'],
//         },
//         {
//           long_name: '青年里',
//           short_name: '青年里',
//           types: ['administrative_area_level_4', 'political'],
//         },
//         {
//           long_name: '中西區',
//           short_name: '中西區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//         {
//           long_name: '700',
//           short_name: '700',
//           types: ['postal_code'],
//         },
//       ],
//       formatted_address: '700台灣台南市中西區衛民街143巷11號',
//       geometry: {
//         location: {
//           lat: 22.9931188,
//           lng: 120.2076142,
//         },
//         location_type: 'ROOFTOP',
//         viewport: {
//           northeast: {
//             lat: 22.9944677802915,
//             lng: 120.2089631802915,
//           },
//           southwest: {
//             lat: 22.99176981970849,
//             lng: 120.2062652197085,
//           },
//         },
//       },
//       place_id: 'ChIJFU-rqIl2bjQRyyL1zmacA-w',
//       plus_code: {
//         compound_code: 'X6V5+62 台灣台南市中西區',
//         global_code: '7QJ2X6V5+62',
//       },
//       types: [
//         'cafe',
//         'establishment',
//         'food',
//         'point_of_interest',
//         'restaurant',
//         'store',
//       ],
//     },
//     {
//       address_components: [
//         {
//           long_name: '16-36',
//           short_name: '16-36',
//           types: ['street_number'],
//         },
//         {
//           long_name: '衛民街143巷',
//           short_name: '衛民街143巷',
//           types: ['route'],
//         },
//         {
//           long_name: '青年里',
//           short_name: '青年里',
//           types: ['administrative_area_level_4', 'political'],
//         },
//         {
//           long_name: '中西區',
//           short_name: '中西區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//         {
//           long_name: '700',
//           short_name: '700',
//           types: ['postal_code'],
//         },
//       ],
//       formatted_address: '700台灣台南市中西區衛民街143巷16-36號',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 22.9932473,
//             lng: 120.2079974,
//           },
//           southwest: {
//             lat: 22.99277,
//             lng: 120.2074602,
//           },
//         },
//         location: {
//           lat: 22.9930001,
//           lng: 120.2077182,
//         },
//         location_type: 'GEOMETRIC_CENTER',
//         viewport: {
//           northeast: {
//             lat: 22.9943576302915,
//             lng: 120.2090777802915,
//           },
//           southwest: {
//             lat: 22.9916596697085,
//             lng: 120.2063798197085,
//           },
//         },
//       },
//       place_id: 'ChIJbQ7oqIl2bjQRelc-G1Cp3RQ',
//       types: ['route'],
//     },
//     {
//       address_components: [
//         {
//           long_name: 'X6V5+62',
//           short_name: 'X6V5+62',
//           types: ['plus_code'],
//         },
//         {
//           long_name: '中西區',
//           short_name: '中西區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//         {
//           long_name: '700',
//           short_name: '700',
//           types: ['postal_code'],
//         },
//       ],
//       formatted_address: 'X6V5+62 台灣台南市中西區',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 22.993125,
//             lng: 120.207625,
//           },
//           southwest: {
//             lat: 22.993,
//             lng: 120.2075,
//           },
//         },
//         location: {
//           lat: 22.9931165,
//           lng: 120.2075046,
//         },
//         location_type: 'GEOMETRIC_CENTER',
//         viewport: {
//           northeast: {
//             lat: 22.9944114802915,
//             lng: 120.2089114802915,
//           },
//           southwest: {
//             lat: 22.9917135197085,
//             lng: 120.2062135197085,
//           },
//         },
//       },
//       place_id: 'GhIJNJ4I4jz-NkARQLFfwUcNXkA',
//       plus_code: {
//         compound_code: 'X6V5+62 台灣台南市中西區',
//         global_code: '7QJ2X6V5+62',
//       },
//       types: ['plus_code'],
//     },
//     {
//       address_components: [
//         {
//           long_name: '青年里',
//           short_name: '青年里',
//           types: ['administrative_area_level_4', 'political'],
//         },
//         {
//           long_name: '中西區',
//           short_name: '中西區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//         {
//           long_name: '700',
//           short_name: '700',
//           types: ['postal_code'],
//         },
//       ],
//       formatted_address: '700台灣台南市中西區青年里',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 22.9937192,
//             lng: 120.211697,
//           },
//           southwest: {
//             lat: 22.991605,
//             lng: 120.2055714,
//           },
//         },
//         location: {
//           lat: 22.9925143,
//           lng: 120.2090774,
//         },
//         location_type: 'APPROXIMATE',
//         viewport: {
//           northeast: {
//             lat: 22.9940110802915,
//             lng: 120.211697,
//           },
//           southwest: {
//             lat: 22.99131311970849,
//             lng: 120.2055714,
//           },
//         },
//       },
//       place_id: 'ChIJDf6WBIl2bjQR0DjjYe3TRI4',
//       types: ['administrative_area_level_4', 'political'],
//     },
//     {
//       address_components: [
//         {
//           long_name: '700',
//           short_name: '700',
//           types: ['postal_code'],
//         },
//         {
//           long_name: '中西區',
//           short_name: '中西區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//       ],
//       formatted_address: '700台灣台南市中西區',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 23.007536,
//             lng: 120.2122595,
//           },
//           southwest: {
//             lat: 22.9812766,
//             lng: 120.1594634,
//           },
//         },
//         location: {
//           lat: 22.9948212,
//           lng: 120.1964522,
//         },
//         location_type: 'APPROXIMATE',
//         viewport: {
//           northeast: {
//             lat: 23.007536,
//             lng: 120.2122595,
//           },
//           southwest: {
//             lat: 22.9812766,
//             lng: 120.1594634,
//           },
//         },
//       },
//       place_id: 'ChIJUxkldnJ2bjQRKaLsqOB0bF8',
//       types: ['postal_code'],
//     },
//     {
//       address_components: [
//         {
//           long_name: '中西區',
//           short_name: '中西區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//         {
//           long_name: '700',
//           short_name: '700',
//           types: ['postal_code'],
//         },
//       ],
//       formatted_address: '700台灣台南市中西區',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 23.007536,
//             lng: 120.2122595,
//           },
//           southwest: {
//             lat: 22.9812766,
//             lng: 120.1594634,
//           },
//         },
//         location: {
//           lat: 22.9948212,
//           lng: 120.1964522,
//         },
//         location_type: 'APPROXIMATE',
//         viewport: {
//           northeast: {
//             lat: 23.007536,
//             lng: 120.2122595,
//           },
//           southwest: {
//             lat: 22.9812766,
//             lng: 120.1594634,
//           },
//         },
//       },
//       place_id: 'ChIJ46LFiW12bjQRTi0d1pRarMc',
//       types: ['administrative_area_level_3', 'political'],
//     },
//     {
//       address_components: [
//         {
//           long_name: '臺南',
//           short_name: '臺南',
//           types: ['colloquial_area', 'locality', 'political'],
//         },
//         {
//           long_name: '大學里',
//           short_name: '大學里',
//           types: ['administrative_area_level_4', 'political'],
//         },
//         {
//           long_name: '東區',
//           short_name: '東區',
//           types: ['administrative_area_level_3', 'political'],
//         },
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//       ],
//       formatted_address: '台灣台南市東區臺南',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 23.3324198,
//             lng: 120.4100317,
//           },
//           southwest: {
//             lat: 22.913062,
//             lng: 120.1327367,
//           },
//         },
//         location: {
//           lat: 22.9997281,
//           lng: 120.2270277,
//         },
//         location_type: 'APPROXIMATE',
//         viewport: {
//           northeast: {
//             lat: 23.3324198,
//             lng: 120.4100317,
//           },
//           southwest: {
//             lat: 22.913062,
//             lng: 120.1327367,
//           },
//         },
//       },
//       place_id: 'ChIJK_I1UZN2bjQRnLZaGDT61Rw',
//       types: ['colloquial_area', 'locality', 'political'],
//     },
//     {
//       address_components: [
//         {
//           long_name: '台南市',
//           short_name: '台南市',
//           types: ['administrative_area_level_1', 'political'],
//         },
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//       ],
//       formatted_address: '台灣台南市',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 23.4137568,
//             lng: 120.6562596,
//           },
//           southwest: {
//             lat: 22.8874908,
//             lng: 120.0277765,
//           },
//         },
//         location: {
//           lat: 22.9998999,
//           lng: 120.2268758,
//         },
//         location_type: 'APPROXIMATE',
//         viewport: {
//           northeast: {
//             lat: 23.4137568,
//             lng: 120.6562596,
//           },
//           southwest: {
//             lat: 22.8874908,
//             lng: 120.0277765,
//           },
//         },
//       },
//       place_id: 'ChIJE_4_lcx8bjQRTnbcpapMf9Q',
//       types: ['administrative_area_level_1', 'political'],
//     },
//     {
//       address_components: [
//         {
//           long_name: '台灣',
//           short_name: 'TW',
//           types: ['country', 'political'],
//         },
//       ],
//       formatted_address: '台灣',
//       geometry: {
//         bounds: {
//           northeast: {
//             lat: 26.4545,
//             lng: 123.5021012,
//           },
//           southwest: {
//             lat: 20.5170001,
//             lng: 116.6665,
//           },
//         },
//         location: {
//           lat: 23.69781,
//           lng: 120.960515,
//         },
//         location_type: 'APPROXIMATE',
//         viewport: {
//           northeast: {
//             lat: 26.4545,
//             lng: 123.5021012,
//           },
//           southwest: {
//             lat: 20.5170001,
//             lng: 116.6665,
//           },
//         },
//       },
//       place_id: 'ChIJL1cHXAbzbjQRaVScvwTwEec',
//       types: ['country', 'political'],
//     },
//   ],
//   status: 'OK',
// };

describe('user reducer', () => {
  const state: UserState = {
    currentLocation: { latLng: undefined, placeId: null, isRealLocation: undefined },
    destination: {
      searchInput: null,
      placeId: null,
      address: null,
      location: undefined,
    },
  };

  test('should return initial state', () => {
    const initialState: UserState = state;
    const action = { type: 'unknown' };
    const expectedState = initialState;
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  // test('should fetch current location', () => {
  //   const getSpy = jest
  //     .spyOn(global, 'fetch')
  //     .mockResolvedValue(FAKE_USER_CURRENT_LOCATION);
  // });
});
