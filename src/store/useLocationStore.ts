import { createSlice, configureStore } from '@reduxjs/toolkit';
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

// const initialParkingLotsState = {
//   parkingLotsInfo: [],
// };

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setCurrentLocation(state, payload) {
      state.userState.currentLocation = payload.payload;
    },
  },
});

// const parkingLotsSlice = createSlice({
//   name: 'parkingLots',
//   initialState: initialParkingLotsState,
//   reducers: {},
// });

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // parkingLots: parkingLotsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const userActions = userSlice.actions;
// export const parkingLotsActions = parkingLotsSlice.actions;

export default store;
