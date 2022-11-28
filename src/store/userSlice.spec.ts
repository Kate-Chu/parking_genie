import userReducer, { type UserState } from './userSlice';

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
});
