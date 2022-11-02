import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { ParkingLotsInfo, AvailableSpacesInfo } from '../types';
import backupData from '../data/backupData.json';
// import axios from 'axios';

const INFO_URL = `https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json`;
const AVAILABLE_URL = `https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json`;

// fetch JSON type
type parkingLotsInfoData = {
  data: {
    UPDATETIME: string;
    park: ParkingLotsInfo[];
  };
};

// fetch JSON type
type availableSpacesData = {
  data: {
    UPDATETIME: string;
    park: AvailableSpacesInfo[];
  };
};

// state type
type ParkingLotsState = {
  parkingLotsInfo: ParkingLotsInfo[];
  availableSpaces: AvailableSpacesInfo[];
};

const initialParkingLotsState: ParkingLotsState = {
  parkingLotsInfo: [],
  availableSpaces: [],
};

// ACTION: fetch parking lots info
export const fetchParkingLotsInfo = createAsyncThunk(
  'parkingLots/fetchParkingLotsInfo',
  async (_, thunkAPI) => {
    try {
      // const response = await fetch<parkingLotsInfoData>(INFO_URL);
      // console.log('In Slice: ', response.data);
      // return response.data;
      const response = await fetch(INFO_URL);
      const data = await response.json();
      // console.log('In asyncThunk data', data);
      return data as parkingLotsInfoData;
      // eslint-disable-next-line
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// fetch available spaces info
export const fetchAvailableSpacesInfo = createAsyncThunk(
  'parkingLots/fetchAvailableSpacesInfo',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(AVAILABLE_URL);
      return (await response.json()) as availableSpacesData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const parkingLotsSlice = createSlice({
  name: 'parkingLots',
  initialState: initialParkingLotsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchParkingLotsInfo.fulfilled,
        (state, action: PayloadAction<parkingLotsInfoData>) => {
          console.log('In extraReducers', action.payload.data.park);
          state.parkingLotsInfo = action.payload.data.park;
        },
      )
      .addCase(fetchParkingLotsInfo.rejected, (state, action) => {
        state.parkingLotsInfo = backupData;
      });
  },
});

export const parkingLotsActions = parkingLotsSlice.actions;
export default parkingLotsSlice.reducer;
