import {createSlice} from '@reduxjs/toolkit';

type HomeData = {
  storedFiles: [];
};

const initialState = {
  storedFiles: []
} as HomeData;

const home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setStoredFiles: (state: any, action: any) => {
      state.storedFiles = action.payload;
    },
  },
});

export const {setStoredFiles} = home.actions;

export default home.reducer;
