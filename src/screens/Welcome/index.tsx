import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import Logo from '../../components/Logo';
import {colors} from '../../theme';
import {icons} from '../../assets/icons';

const DashBoard = () => {
  const navigation = useNavigation();

  const onSubmitPress = () => {
    //@ts-ignore
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.baseContainer}>
      <View
        style={{
          marginTop: scale(30),
        }}>
        <Logo />
      </View>

      <Text style={styles.appointmentText}>Appointment Check-In</Text>
      <Text style={styles.date}>Tuesday, August 2, 2022</Text>

      <Text style={styles.text1}>Thank You for checking in!</Text>
      <Text style={styles.text2}>
        Please make yourself comfortale and your provider will be out to greet
        you shortly.
      </Text>

      <View style={styles.container}>
        <Image source={icons.demo} style={styles.img} />
        <View style={{marginLeft: scale(10), justifyContent: 'center'}}>
          <Text style={styles.upperText}>
            Dr. Courtney Shen DeShetler, PsyD
          </Text>
          <Text style={styles.lowerText}>License #PSY31253</Text>
        </View>
      </View>

      <View style={styles.input}>
        <Text style={{fontSize: 15, color: colors.white, fontWeight: '500'}}>
          Check-in at 3:07pm
        </Text>
      </View>
      <TouchableOpacity>
        <View style={styles.submitButton}>
          <Text style={styles.buttonText}>Close</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.base,
  },
  appointmentText: {
    fontSize: 24,
    color: colors.black,
    marginTop: scale(15),
    fontWeight: '500',
  },
  text1: {
    fontSize: 24,
    color: colors.black,
    marginTop: scale(15),
    fontWeight: '500',
  },
  text2: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '500',
    marginHorizontal: scale(10),
  },
  date: {
    fontSize: 18,
    color: colors.black,
    marginTop: scale(10),
    fontWeight: '500',
  },
  container: {
    flexDirection: 'row',
    height: scale(70),
    width: scale(300),
    borderRadius: 18,
    backgroundColor: colors.white,
    padding: 10,
    marginTop: scale(15),
    fontSize: 20,
  },
  input: {
    height: scale(30),
    width: scale(300),
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(15),
    fontSize: 20,
  },
  buttonText: {color: colors.white, fontSize: 22, fontWeight: '500'},

  submitButton: {
    height: scale(40),
    width: scale(250),
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(30),
  },
  img: {
    height: scale(60),
    width: scale(60),
    borderRadius: 15,
  },
  upperText: {fontSize: 15, color: colors.black, fontWeight: '600'},
  lowerText: {fontSize: 15, color: colors.bodyTextColor},
});
