import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface AuthState {
  authToken: string | null;
}

const initialState = {
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginUser: (state: AuthState, action: PayloadAction<string>) => {
      AsyncStorage.setItem('authToken', action.payload);
      state.authToken = action.payload;
    },
    logoutUser: (state: AuthState) => {
      AsyncStorage.removeItem('authToken');
      state.authToken = null;
    },
  },
});

export default authSlice.reducer;

export const {loginUser, logoutUser} = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;
