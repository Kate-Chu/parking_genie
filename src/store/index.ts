import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import parkingLotsReducer from './parkingLotsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    parkingLots: parkingLotsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const rootReducer = combineReducers({
  user: userReducer,
  parkingLots: parkingLotsReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
