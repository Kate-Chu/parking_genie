import { createSlice } from '@reduxjs/toolkit';
import { LatLngExpression } from 'leaflet';
import { TAIPEI_LNG, TAIPEI_LAT, LINE_TAIWAN } from '../data/default_data';

export type userState = {
  userState: {
    currentLocation: LatLngExpression | undefined,
    destination: {
      name: null | string,
      location: undefined | LatLngExpression,
    },
  },
};

const initialUserState: userState = {
  userState: {
    currentLocation: undefined,
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
      const currentLatLan = payload.payload.latlng;
      if (
        Math.floor(currentLatLan.lat) !== TAIPEI_LAT ||
        Math.floor(currentLatLan.lng) !== TAIPEI_LNG
      ) {
        state.userState.currentLocation = LINE_TAIWAN;
      } else {
        state.userState.currentLocation = payload.payload;
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
