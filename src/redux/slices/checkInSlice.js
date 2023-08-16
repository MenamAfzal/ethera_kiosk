import {createSlice} from '@reduxjs/toolkit';
import {checkIn} from '../actions/checkInAction';
const initialState = {
  error: null,
  loading: false,
  success: false,
};

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {
    setCheckIn: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: {
    [checkIn.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [checkIn.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      console.log('success in checkin ', JSON.stringify(payload, null, 2));
    },
    [checkIn.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
      console.log('Rejection in CheckIn', payload);
    },
  },
});

export default checkInSlice.reducer;
export const {setCheckIn} = checkInSlice.actions;
