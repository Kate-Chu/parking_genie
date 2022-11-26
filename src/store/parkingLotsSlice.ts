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

export type ParkingLotsState = {
  parkingLotsInfo: ParkingLotsInfo[];
  availableSpaces: AvailableSpacesInfo[];
  nearbyParkingLots: ParkingLotsInfo[];
  mapBounds: LatLngBounds;
  hideUnknownSpacesLots: boolean;
};

export const initialParkingLotsState: ParkingLotsState = {
  parkingLotsInfo: [],
  availableSpaces: [],
  nearbyParkingLots: [],
  mapBounds: {} as LatLngBounds,
  hideUnknownSpacesLots: true,
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
    setNearbyParkingLots: (state, action: PayloadAction<ParkingLotsInfo[]>) => {
      if (!state.hideUnknownSpacesLots) {
        state.nearbyParkingLots = action.payload;
      } else {
        state.nearbyParkingLots = action.payload.filter((lot) => {
          const availableSpaces = state.availableSpaces.find(
            (space) => space.id === lot.id,
          );
          return availableSpaces?.availablecar && availableSpaces.availablecar >= 0;
        });
      }
    },
    setMapBounds: (state, action) => {
      state.mapBounds = action.payload;
    },
    toggleUnknownSpacesLots: (state) => {
      state.hideUnknownSpacesLots = !state.hideUnknownSpacesLots;
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
