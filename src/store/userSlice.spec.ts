import userReducer, { type UserState, userActions } from './userSlice';

describe('user reducer', () => {
  const state: UserState = {
    showSidebar: false,
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

  test('should handle toggleSidebar', () => {
    const initialState: UserState = {
      ...state,
      showSidebar: false,
    };
    const action = userActions.toggleSidebar();
    const expectedState = { userState: { ...state, showSidebar: true } };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
