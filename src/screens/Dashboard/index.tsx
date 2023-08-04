import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';

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
        <Text style={{fontSize: 20, color: colors.bodyTextColor, flexGrow: 1}}>
          Provider Name
        </Text>
        <View>
          <AntDesign name="caretup" size={12} color="black" />
          <AntDesign name="caretdown" size={12} color="black" />
        </View>
      </View>
      <Text style={styles.date}>Please input your first and last initials</Text>
      <TextInput
        placeholder="AA"
        placeholderTextColor={colors.bodyTextColor}
        style={styles.initialContainer}
        onChangeText={text => {}}
        // value={description}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity onPress={onSubmitPress}>
        <View style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
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
    fontSize: 28,
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
    height: scale(50),
    width: scale(280),
    borderRadius: 50,
    backgroundColor: colors.white,
    padding: 10,
    marginTop: scale(15),
    borderColor: colors.black,
    borderWidth: 0.5,
    fontSize: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  buttonText: {color: colors.white, fontSize: 22, fontWeight: '500'},
  initialContainer: {
    height: scale(50),
    width: scale(130),
    borderRadius: 8,
    backgroundColor: colors.white,
    marginTop: scale(15),
    borderColor: colors.black,
    borderWidth: 0.5,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

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
