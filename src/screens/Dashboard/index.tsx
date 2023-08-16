import React, {useEffect, useState} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';

import Logo from '../../components/Logo';
import {colors} from '../../theme';
import {icons} from '../../assets/icons';
import {useSelector} from 'react-redux';
import {currentDate} from '../../utils/currentDate';

const DashBoard = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [providerList, setProviderList] = useState([]);

  const providers = useSelector(state => state?.provider?.providerList);
  console.log('providers', providers);
  const onSubmitPress = () => {
    //@ts-ignore
    navigation.navigate('Welcome');
  };

  useEffect(() => {
    const data = providers.map((item, index) => ({
      label: item.name,
      value: item.id,
    }));
    setProviderList(data);
  }, [providers]);

  return (
    <View style={styles.baseContainer}>
      <View
        style={{
          marginTop: scale(30),
        }}>
        <Logo />
      </View>

      <Text style={styles.appointmentText}>Appointment Check-In</Text>
      <Text style={styles.date}>{currentDate()}</Text>

      <View style={styles.container}>
        <Image source={icons.demo} style={styles.img} />
        <View style={{marginLeft: scale(10), justifyContent: 'center'}}>
          <Text style={styles.upperText}>
            Dr. Courtney Shen DeShetler, PsyD
          </Text>
          <Text style={styles.lowerText}>License #PSY31253</Text>
        </View>
      </View>

      <View style={styles.containerDropdown}>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={providerList}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Provider Name' : '...'}
          value={value}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            //@ts-ignore
            setValue(item.value);
            setIsFocus(false);
          }}
        />
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
    fontSize: scale(24),
    color: colors.black,
    marginTop: scale(15),
    fontWeight: '500',
  },
  date: {
    fontSize: scale(14),
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
    fontSize: scale(20),
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
  buttonText: {color: colors.white, fontSize: scale(18), fontWeight: '500'},
  initialContainer: {
    height: scale(50),
    width: scale(130),
    borderRadius: 8,
    backgroundColor: colors.white,
    marginTop: scale(15),
    borderColor: colors.black,
    borderWidth: 0.5,
    fontSize: scale(18),
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
  upperText: {fontSize: scale(14), color: colors.black, fontWeight: '600'},
  lowerText: {fontSize: scale(14), color: colors.bodyTextColor},
  input: {
    height: scale(50),
    width: scale(280),
    borderRadius: 50,
    backgroundColor: colors.white,
    padding: 10,
    marginTop: scale(15),
    borderColor: colors.black,
    borderWidth: 0.5,
    fontSize: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerDropdown: {
    marginTop: scale(15),
    backgroundColor: 'white',
  },
  dropdown: {
    height: scale(50),
    width: scale(280),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: scale(16),
  },
  placeholderStyle: {
    fontSize: scale(16),
  },
  selectedTextStyle: {
    fontSize: scale(16),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: scale(16),
  },
});
