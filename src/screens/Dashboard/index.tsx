import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Logo from '../../components/Logo';
import {colors} from '../../theme';
import {useSelector, useDispatch} from 'react-redux';
import {currentDate} from '../../utils/currentDate';
import {checkIn} from '../../redux/actions/checkInAction';
import {icons} from '../../assets/icons';
import {setCheckIn} from '../../redux/slices/checkInSlice';

const DashBoard = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [providerList, setProviderList] = useState([]);
  const [nameInitials, setNameInitials] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [time, setTime] = useState('');

  const dispatch = useDispatch();
  const providers = useSelector(state => state?.provider?.providerList);
  const checkInSelector = useSelector(state => state?.checkIn);
  const onSubmitPress = async () => {
    const params = {id: value, client_initials: nameInitials};

    //@ts-ignore
    dispatch(checkIn(params));
    // navigation.navigate('Welcome');
  };

  const onClosePress = () => {
    dispatch(setCheckIn({success: true}));
    //@ts-ignore
    navigation.navigate('CheckIn');
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };
  useEffect(() => {
    const data = providers.map((item, index) => ({
      label: item?.first_name + ' ' + item?.middle_name + ' ' + item?.last_name,
      value: item?.id,
      lisence: item?.provider_license,
      avatar: item?.avatar,
    }));
    setProviderList(data);
  }, [providers]);

  useEffect(() => {
    if (checkInSelector?.success) {
      setTime(getCurrentTime());
    }
  }, [checkInSelector?.success]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1, backgroundColor: colors.base}}
      bounces={false}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      scrollToOverflowEnabled={true}
      enableAutomaticScroll={true}
      extraHeight={150}>
      <View style={styles.baseContainer}>
        <View
          style={{
            marginTop: scale(30),
          }}>
          <Logo />
        </View>

        <Text style={styles.appointmentText}>Appointment Check-In</Text>
        <Text style={styles.date}>{currentDate()}</Text>
        {checkInSelector?.success ? (
          <>
            <Text style={styles.text1}>Thank You for checking in!</Text>
            <Text style={styles.text2}>
              Please make yourself comfortable and your provider will be out to
              greet you shortly.
            </Text>
          </>
        ) : null}

        <View style={styles.container}>
          {selectedProvider ? (
            <>
              <Image
                source={
                  selectedProvider?.avatar
                    ? {uri: selectedProvider?.avatar}
                    : icons?.noImg
                }
                style={styles.img}
              />
              <View style={{marginLeft: scale(10), justifyContent: 'center'}}>
                <Text style={styles.upperText}>{selectedProvider?.label}</Text>
                {selectedProvider?.lisence?.map((item, index) => {
                  return (
                    <Text key={index} style={styles.lowerText}>
                      #{item?.license_number}
                    </Text>
                  );
                })}
              </View>
            </>
          ) : (
            <Text style={styles.middleText}>Nothing To Show</Text>
          )}
        </View>
        {!checkInSelector?.success ? (
          <>
            <View style={styles.containerDropdown}>
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
                  setSelectedProvider(item);
                }}
              />
            </View>
            <Text style={styles.date}>
              Please input your first and last initials
            </Text>
            <TextInput
              placeholder="AA"
              placeholderTextColor={colors.bodyTextColor}
              style={styles.initialContainer}
              onChangeText={text => {
                setNameInitials(text);
              }}
              value={nameInitials}
              underlineColorAndroid="transparent"
            />
          </>
        ) : null}
        {checkInSelector?.success ? (
          <View style={styles.checkedIn}>
            <Text
              style={{
                fontSize: scale(14),
                color: colors.white,
                fontWeight: '500',
              }}>
              Check-In at {time}
            </Text>
          </View>
        ) : null}

        {value && nameInitials && !checkInSelector?.success ? (
          <TouchableOpacity onPress={onSubmitPress}>
            <View style={styles.submitButton}>
              {checkInSelector?.loading ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
            </View>
          </TouchableOpacity>
        ) : null}

        {checkInSelector?.success ? (
          <TouchableOpacity onPress={onClosePress}>
            <View style={styles.submitButton}>
              <Text style={styles.buttonText}>Close</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </KeyboardAwareScrollView>
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
  middleText: {
    fontSize: scale(14),
    color: colors.black,
    fontWeight: '600',
    alignSelf: 'center',
  },
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
  checkedIn: {
    height: scale(30),
    width: scale(300),
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(15),
  },
  containerDropdown: {
    marginTop: scale(15),
    // backgroundColor: 'white',
  },
  dropdown: {
    height: scale(50),
    width: scale(280),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: 'black',
    fontWeight: '400',
  },
  selectedTextStyle: {
    fontSize: scale(16),
    color: 'black',
    fontWeight: '400',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: scale(16),
  },
  text1: {
    fontSize: scale(20),
    color: colors.black,
    marginTop: scale(15),
    fontWeight: '500',
  },
  text2: {
    fontSize: scale(14),
    color: colors.black,
    fontWeight: '500',
    marginHorizontal: scale(10),
  },
});
