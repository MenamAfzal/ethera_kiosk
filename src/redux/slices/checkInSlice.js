import {createSlice} from '@reduxjs/toolkit';
import {checkIn} from '../actions/checkInAction';
const initialState = {
  error: null,
  loading: false,
};

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {},
  extraReducers: {
    // get ethera provider
    [checkIn.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [checkIn.fulfilled]: (state, {payload}) => {
      state.loading = false;
      console.log(
        'success in checkin ',
        JSON.stringify(payload?.result, null, 2),
      );
    },
    [checkIn.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      console.log('Reection in CheckIn', payload);
    },
  },
});

export default checkInSlice.reducer;
// export const {} = checkInSlice.actions;
