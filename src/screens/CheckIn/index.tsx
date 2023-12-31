import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {getProvider} from '../../redux/actions/providerAction';
import Logo from '../../components/Logo';
import {colors} from '../../theme';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currentDate} from '../../utils/currentDate';

const CheckIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const OnCheckinPress = () => {
    //@ts-ignore
    navigation.navigate('DashBoard');
  };

  const fetchProvider = async () => {
    const locationId = await AsyncStorage.getItem('locationId');
    //@ts-ignore
    dispatch(getProvider(locationId));
  };

  useEffect(() => {
    fetchProvider();
  }, []);

  return (
    <View style={styles.baseContainer}>
      <View
        style={{
          marginTop: scale(60),
        }}>
        <Logo />
      </View>

      <Text style={styles.welcomText}>Welcome to Ethera</Text>
      <Text style={styles.date}>{currentDate()}</Text>

      <TouchableOpacity onPress={OnCheckinPress}>
        <View style={styles.checkinButton}>
          <Text style={styles.buttonText}>Tap To Check-In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.base,
  },
  welcomText: {
    fontSize: 34,
    color: colors.black,
    marginTop: scale(15),
    fontWeight: '500',
  },
  date: {
    fontSize: 18,
    color: colors.black,
    marginTop: scale(10),
    fontWeight: '500',
  },
  label: {marginVertical: 5, color: colors.grey},
  input: {
    height: scale(50),
    width: scale(300),
    borderRadius: 9,
    backgroundColor: colors.white,
    textAlignVertical: 'center',
    padding: 10,
    marginTop: scale(15),
    borderColor: colors.black,
    borderWidth: 0.5,
    fontSize: 20,
  },
  checkinButton: {
    height: scale(140),
    width: scale(270),
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(30),
  },
  buttonText: {color: colors.white, fontSize: 30, fontWeight: '900'},
});
