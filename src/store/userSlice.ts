import { createSlice } from '@reduxjs/toolkit';
import { LatLngExpression } from 'leaflet';

export type userState = {
  userState: {
    currentLocation: null | LatLngExpression;
    destination: {
      name: null | string;
      location: undefined | LatLngExpression;
    };
  };
};

const initialUserState: userState = {
  userState: {
    currentLocation: null,
    destination: {
      name: null,
      location: undefined,
    },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setCurrentLocation(state, payload) {
      state.userState.currentLocation = payload.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
