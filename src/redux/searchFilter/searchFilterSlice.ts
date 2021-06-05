import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState: {
    region: 'Toshkent',
    case: 'Lost',
  },

  reducers: {
    changeRegion: (state, action) => {
      state.region = action.payload;
    },
    changeCase: (state, action) => {
      state.case = action.payload;
    },
  },
});

export default searchFilterSlice.reducer;

export const {changeCase, changeRegion} = searchFilterSlice.actions;

export const selectSearchFilterState = (state: RootState) => state.searchFilter;
