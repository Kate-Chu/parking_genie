import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { ParkingLotsInfo, AvailableSpacesInfo } from '../types';

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
      const response = await fetch(INFO_URL);
      const data = await response.json();
      return data as parkingLotsInfoData;
      // eslint-disable-next-line
    } catch (err: any) {
      console.log(err.message);
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
      return data as availableSpacesData;
      // eslint-disable-next-line
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
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
          state.parkingLotsInfo = action.payload.data.park;
        },
      )
      .addCase(fetchParkingLotsInfo.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchAvailableSpacesInfo.fulfilled, (state, action) => {
        state.availableSpaces = action.payload.data.park;
      })
      .addCase(fetchAvailableSpacesInfo.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const parkingLotsActions = parkingLotsSlice.actions;
export default parkingLotsSlice.reducer;
