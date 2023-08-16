import {createSlice} from '@reduxjs/toolkit';
import {getProvider} from '../actions/providerAction';

const initialState = {
  providerList: [],
  error: null,
  loading: false,
};

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {},
  extraReducers: {
    // get ethera provider
    [getProvider.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getProvider.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.providerList = payload?.result;
      console.log(
        'success in provider ',
        JSON.stringify(payload?.result, null, 2),
      );
    },
    [getProvider.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      console.log('payload in providers', payload);
    },
  },
});

export default providerSlice.reducer;
// export const {} = providerSlice.actions;
