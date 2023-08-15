import {createSlice} from '@reduxjs/toolkit';
import {getLocation} from '../actions/locationAction';
const initialState = {
  locationsList: [],
  error: null,
  loading: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: {
    // get ethera Location
    [getLocation.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getLocation.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.locationsList = payload?.result;
      console.log('success', JSON.stringify(payload?.result, null, 2));
    },
    [getLocation.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      console.log('payload in rejected get location', payload);
    },
  },
});

export default locationSlice.reducer;
// export const {} = locationSlice.actions;
