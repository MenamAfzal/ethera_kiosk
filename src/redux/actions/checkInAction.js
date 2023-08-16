import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const backendURL = 'https://backend-dot-konav2-dev.wl.r.appspot.com';

export const checkIn = createAsyncThunk(
  'get/provider',
  async ({locationId}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        // `${backendURL}/api/login`,
        // `https://backend-dot-konav2-dev.wl.r.appspot.com//api/locations/${locationId}/kiosk-providers`,
        `https://backend-dot-konav2-dev.wl.r.appspot.com/api/api/kiosk-providers/aef90f7d-d0cd-4d4d-a805-3dc3105f0fec`,

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
  },
);
