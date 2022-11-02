import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import parkingLotsReducer from './parkingLotsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    parkingLots: parkingLotsReducer,
  },
  // reducer: parkingLotsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
