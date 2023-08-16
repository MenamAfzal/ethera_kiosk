import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import locationSlice from './slices/locationSlice';
import providerSlice from './slices/providerSlice';
import checkInSlice from './slices/checkInSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationSlice,
    provider: providerSlice,
    checkIn: checkInSlice,
  },
});
export default store;
