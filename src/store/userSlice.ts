import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LatLngExpression } from 'leaflet';
import { TAIPEI_LNG, TAIPEI_LAT, LINE_TAIWAN } from '../data/default_data';
import type { GeocodingData } from '../types';

const GEOCODING_API = process.env.REACT_APP_GEOCODING_API_KEY;

const GEOCODING_ADDRESS_TO_LNG_URL =
  'https://maps.googleapis.com/maps/api/geocode/json?address=';
// const GEOCODING_LNG_TO_ADDRESS_URL =
//   'https://maps.googleapis.com/maps/api/geocode/json？latlng=';

type userState = {
  userState: {
    currentLocation: LatLngExpression | undefined;
    destination: {
      searchInput: null | string;
      placeId: null | string;
      address: null | string;
      location: undefined | LatLngExpression;
    };
  };
};

const initialUserState: userState = {
  userState: {
    currentLocation: undefined,
    destination: {
      searchInput: null,
      placeId: null,
      address: null,
      location: undefined,
    },
  },
};

// ACTION: fetch destination data info
export const fetchDestinationLatLng = createAsyncThunk(
  'user/fetchDestinationLatLng',
  async (input: string, thunkAPI) => {
    try {
      const response = await fetch(
        `${GEOCODING_ADDRESS_TO_LNG_URL}${input}&key=${GEOCODING_API}`,
      );
      const data = await response.json();
      return { input, data } as { input: string; data: GeocodingData };
      // eslint-disable-next-line
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(
      fetchDestinationLatLng.fulfilled,
      (state, action: PayloadAction<{ input: string; data: GeocodingData }>) => {
        const dest = state.userState.destination;
        const { lat, lng } = action.payload.data.results[0].geometry.location;
        dest.searchInput = action.payload.input;
        dest.address = action.payload.data.results[0].formatted_address;
        dest.placeId = action.payload.data.results[0].place_id;
        dest.location = [lat, lng];
      },
    );
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
