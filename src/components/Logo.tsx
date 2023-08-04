import React from 'react';
import {View, Text, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {icons} from '../assets/icons';

const Logo = () => {
  return (
    <View
      style={{
        height: scale(200),
        width: scale(200),
        borderRadius: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{height: scale(100), width: scale(100)}}
        source={icons.logo}
      />
      <Text style={{fontSize: 32, color: 'black'}}>ethera</Text>
    </View>
  );
};

export default Logo;
