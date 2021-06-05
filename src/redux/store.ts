import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import searchFilterSlice from './searchFilter/searchFilterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    searchFilter: searchFilterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
