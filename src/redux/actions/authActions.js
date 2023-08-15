import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const backendURL = 'https://backend-dot-konav2-dev.wl.r.appspot.com';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      console.log(email, password);
      const response = await axios.post(
        // `${backendURL}/api/login`,
        'https://backend-dot-konav2-dev.wl.r.appspot.com/api/login',
        {
          email,
          password,
        },
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
