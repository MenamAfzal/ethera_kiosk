import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import locationSlice from './slices/locationSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationSlice,
  },
});
export default store;
