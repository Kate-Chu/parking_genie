import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LatLngExpression, LatLngTuple, LocationEvent } from 'leaflet';
import { TAIPEI_LNG, TAIPEI_LAT, LINE_TAIWAN } from '../data/default_data';
import type { GeocodingData } from '../types';

const GEOCODING_API = process.env.REACT_APP_GEOCODING_API_KEY;

const GEOCODING_ADDRESS = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const GEOCODING_LAT_LNG = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

type userState = {
  userState: {
    currentLocation: {
      latLng: LatLngTuple | undefined;
      placeId: null | string;
    };
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
    currentLocation: { latLng: undefined, placeId: null },
    destination: {
      searchInput: null,
      placeId: null,
      address: null,
      location: undefined,
    },
  },
};

// ACTION: fetch current location and google-place-id
export const fetchCurrentLocation = createAsyncThunk(
  'user/fetchCurrentLocation',
  async (input: LocationEvent, thunkAPI) => {
    try {
      const response = await fetch(
        `${GEOCODING_LAT_LNG}${input.latlng.lat},${input.latlng.lng}&key=${GEOCODING_API}`,
      );
      const data = await response.json();
      return { input, data } as { input: LocationEvent; data: GeocodingData };
      // eslint-disable-next-line
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// ACTION: fetch destination data info
export const fetchDestinationLatLng = createAsyncThunk(
  'user/fetchDestinationLatLng',
  async (input: string, thunkAPI) => {
    try {
      const response = await fetch(`${GEOCODING_ADDRESS}${input}&key=${GEOCODING_API}`);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDestinationLatLng.fulfilled,
        (state, action: PayloadAction<{ input: string; data: GeocodingData }>) => {
          const dest = state.userState.destination;
          const { lat, lng } = action.payload.data.results[0].geometry.location;
          dest.searchInput = action.payload.input;
          dest.address = action.payload.data.results[0].formatted_address;
          dest.placeId = action.payload.data.results[0].place_id;
          dest.location = [lat, lng];
        },
      )
      .addCase(
        fetchCurrentLocation.fulfilled,
        (state, action: PayloadAction<{ input: LocationEvent; data: GeocodingData }>) => {
          state.userState.currentLocation.placeId =
            action.payload.data.results[0].place_id;

          const currentLatLan: LatLngExpression = action.payload.input.latlng;
          if (
            Math.floor(currentLatLan.lat) !== TAIPEI_LAT ||
            Math.floor(currentLatLan.lng) !== TAIPEI_LNG
          ) {
            // alert(
            //   '很抱歉我們目前僅提供台北市停車場資料查詢，已將您導向 Line 台北總部，未來將儘速為您提供其他地區的服務',
            // );
            state.userState.currentLocation.latLng = LINE_TAIWAN;
          } else {
            state.userState.currentLocation.latLng = [
              action.payload.input.latlng.lat,
              action.payload.input.latlng.lng,
            ];
          }
        },
      );
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
