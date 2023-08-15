import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, DashBoard, CheckIn, Welcome} from '../screens';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {setLogin} from '../redux/slices/authSlice';

const Stack = createNativeStackNavigator();
function Appstack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

function Authstack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export const RootNavigator = () => {
  const authSelector = useSelector(state => state?.auth);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (authSelector?.isLogout) {
      setToken('');
    } else if (!authSelector?.isLoggedIn) {
      checkUserLoginAction();
    } else {
      setToken(authSelector?.userToken);
    }
  }, [authSelector?.isLoggedIn, authSelector?.isLogout]);

  // console.log('isLoggedIn', isLoggedIn, token);
  const checkUserLoginAction = async () => {
    const token: any = await AsyncStorage.getItem('token');
    if (token) {
      dispatch(setLogin({token: token, isLoggedIn: true}));
    }
  };

  // checkUserLoginAction();

  return (
    <NavigationContainer>
      {token ? <Appstack /> : <Authstack />}
    </NavigationContainer>
  );
};
