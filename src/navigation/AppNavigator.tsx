import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, DashBoard, CheckIn, Welcome} from '../screens';

const Stack = createNativeStackNavigator();
function Appstack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Appstack />
    </NavigationContainer>
  );
};
