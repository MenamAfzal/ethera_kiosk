import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendURL = 'https://backend-dot-konav2-dev.wl.r.appspot.com';

export const getProvider = createAsyncThunk(
  'get/provider',
  async locationId => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        // `${backendURL}/api/login`,
        `https://backend-dot-konav2-dev.wl.r.appspot.com/api/locations/${locationId}/kiosk-providers`,
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
