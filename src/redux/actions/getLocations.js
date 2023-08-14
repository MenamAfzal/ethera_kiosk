import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const backendURL = 'https://backend-dot-konav2-dev.wl.r.appspot.com';

export const getLocation = createAsyncThunk('get/location', async () => {
  console.log('in action');
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(
      // `${backendURL}/api/login`,
      'https://backend-dot-konav2-dev.wl.r.appspot.com/api/kiosk-location',
      config,
    );
    return response?.data;
  } catch (error) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      console.log('error', error);
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
