import {createSlice} from '@reduxjs/toolkit';
import {loginUser} from '../actions/authActions';

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  isLoggedIn: false, // for monitoring the registration process.
  isLoggedOut: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      return (state = {
        isLoggedIn: action.payload.isLoggedIn,
        userToken: action.payload.token,
      });
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    // register user
    [loginUser.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.isLoggedIn = true; // login successful
      state.userToken = payload?.access;
      state.error = null;
      console.log('success', JSON.stringify(payload?.access, null, 2));
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.loading = false;
      state.error = 'Invalid Credentials';
      console.log('payload in rejected', JSON.stringify(payload, null, 2));
    },
  },
});

export default authSlice.reducer;
export const {setLogin, setLogout} = authSlice.actions;
