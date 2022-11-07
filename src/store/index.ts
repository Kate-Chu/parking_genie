import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import parkingLotsReducer from './parkingLotsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    parkingLots: parkingLotsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore the non-serializable action types
        ignoredActions: [
          'user/setCurrentLocation',
          'user/fetchCurrentLocation/fulfilled',
          'parkingLots/setMapBounds',
        ],
      },
    }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
