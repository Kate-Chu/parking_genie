import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LatLngBounds } from 'leaflet';
import type {
  ParkingLotsInfo,
  AvailableSpacesInfo,
  ParkingLotsInfoData,
  AvailableSpacesData,
} from '../types';

const INFO_URL = `https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json`;
const AVAILABLE_URL = `https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json`;

type ParkingLotsState = {
  parkingLotsInfo: ParkingLotsInfo[];
  availableSpaces: AvailableSpacesInfo[];
  nearbyParkingLots: ParkingLotsInfo[];
  mapBounds: LatLngBounds;
};

const initialParkingLotsState: ParkingLotsState = {
  parkingLotsInfo: [],
  availableSpaces: [],
  nearbyParkingLots: [],
  mapBounds: {} as LatLngBounds,
};

// ACTION: fetch parking lots info
export const fetchParkingLotsInfo = createAsyncThunk(
  'parkingLots/fetchParkingLotsInfo',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(INFO_URL);
      const data = await response.json();
      return data as ParkingLotsInfoData;
      // eslint-disable-next-line
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// ACTION: fetch available spaces info
export const fetchAvailableSpacesInfo = createAsyncThunk(
  'parkingLots/fetchAvailableSpacesInfo',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(AVAILABLE_URL);
      const data = await response.json();
      return data as AvailableSpacesData;
      // eslint-disable-next-line
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const parkingLotsSlice = createSlice({
  name: 'parkingLots',
  initialState: initialParkingLotsState,
  reducers: {
    setNearbyParkingLots: (state, action) => {
      state.nearbyParkingLots = action.payload;
    },
    setMapBounds: (state, action) => {
      state.mapBounds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchParkingLotsInfo.fulfilled,
        (state, action: PayloadAction<ParkingLotsInfoData>) => {
          state.parkingLotsInfo = action.payload.data.park;
        },
      )
      .addCase(fetchAvailableSpacesInfo.fulfilled, (state, action) => {
        state.availableSpaces = action.payload.data.park;
      });
  },
});

export const parkingLotsActions = parkingLotsSlice.actions;
export default parkingLotsSlice.reducer;

// serializableStateInvariantMiddleware.ts:221
// A non-serializable value was detected in the state, in the path: `parkingLots.mapBounds`. Value: LatLngBounds{_southWest: // LatLng, _northEast: LatLng}
// Take a look at the reducer(s) handling this action type: parkingLots/fetchAvailableSpacesInfo/fulfilled.
