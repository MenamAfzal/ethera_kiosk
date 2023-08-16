import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import {ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {colors} from '../../theme';
import Logo from '../../components/Logo';
import {loginUser} from '../../redux/actions/authActions';
import {getLocation} from '../../redux/actions/locationAction';

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Not a valid Email'),
  password: yup
    .string()
    .min(6, () => `Password must be at least 6 characters`)
    .required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  let password_ref = useRef(null);
  const dispatch = useDispatch();
  const authSelector = useSelector(state => state?.auth);
  const location = useSelector(state => state?.location?.locationsList);

  const [locationError, setLocationError] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [locationList, setLocationList] = useState([]);

  const submitHandler = async (values: {email: string; password: string}) => {
    if (!value) {
      setLocationError('Please Set a Location');
    } else {
      await AsyncStorage.setItem('locationId', value);

      //@ts-ignore
      dispatch(loginUser(values));
    }
  };

  const isAuthenticated = async () => {
    if (authSelector?.isLoggedIn) {
      await AsyncStorage.setItem('token', authSelector?.userToken);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, [authSelector?.isLoggedIn]);

  useEffect(() => {
    //@ts-ignore
    dispatch(getLocation());
  }, []);

  useEffect(() => {
    const data = location.map((item, index) => ({
      label: item.name,
      value: item.id,
    }));
    setLocationList(data);
  }, [location]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1}}
      bounces={false}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      scrollToOverflowEnabled={true}
      enableAutomaticScroll={true}>
      <View style={styles.baseContainer}>
        <View
          style={{
            marginTop: scale(60),
          }}>
          <Logo />
        </View>

        <Text style={styles.loginText}>Please Login</Text>
        <Formik
          // initialValues={{email: 'test130@gmail.com', password: 'Ethera2021!'}}
          initialValues={{email: '', password: ''}}
          validateOnMount={true}
          validationSchema={loginValidationSchema}
          // onSubmit={values => console.log(values)}

          onSubmit={values => submitHandler(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <View style={styles.inputView}>
                <View
                  style={{
                    borderRightColor: colors.black,
                    borderRightWidth: 0.5,
                  }}>
                  <Entypo
                    name="user"
                    size={24}
                    color="#1D5D9B"
                    style={{
                      paddingHorizontal: scale(12),
                      paddingVertical: scale(12),
                    }}
                  />
                </View>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={colors.bodyTextColor}
                  multiline={true}
                  style={styles.input}
                  onChangeText={value => {
                    handleChange('email')(value);
                    errors.email = '';
                  }}
                  value={values.email}
                  underlineColorAndroid="transparent"
                  // @ts-ignore
                  onSubmitEditing={() => password_ref?.current.focus()}
                  autoFocus={true}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errMsg}>{errors.email}</Text>
              )}
              <View style={styles.inputView}>
                <View
                  style={{
                    borderRightColor: colors.black,
                    borderRightWidth: 0.5,
                  }}>
                  <Entypo
                    name="lock"
                    size={24}
                    color="#1D5D9B"
                    style={{
                      paddingHorizontal: scale(12),
                      paddingVertical: scale(12),
                    }}
                  />
                </View>
                <TextInput
                  placeholder="Password"
                  ref={password_ref}
                  placeholderTextColor={colors.bodyTextColor}
                  multiline={true}
                  style={styles.input}
                  onChangeText={value => {
                    handleChange('password')(value);
                    errors.password = '';
                  }}
                  value={values.password}
                  underlineColorAndroid="transparent"
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errMsg}>{errors.password}</Text>
              )}
              {authSelector?.error ? (
                <Text style={styles.errMsg}>{authSelector?.error}</Text>
              ) : null}

              <View style={styles.container}>
                {/* {renderLabel()} */}
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={locationList}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  value={value}
                  onFocus={() => {
                    setIsFocus(true), setLocationError('');
                  }}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    //@ts-ignore
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              {locationError ? (
                <Text style={styles.errMsg}>Select a location</Text>
              ) : null}

              <TouchableOpacity
                //@ts-ignore
                onPress={handleSubmit}>
                <View style={styles.loginButton}>
                  {authSelector?.loading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </View>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.base,
  },
  loginText: {
    fontSize: scale(24),
    color: 'black',
    marginTop: scale(15),
    fontWeight: '500',
  },
  input: {
    flexGrow: 1,
    textAlignVertical: 'center',
    fontSize: scale(16),
    paddingLeft: scale(15),
  },
  inputView: {
    flexDirection: 'row',
    height: scale(50),
    width: scale(300),
    borderRadius: 9,
    backgroundColor: colors.white,
    marginTop: scale(15),
    borderColor: 'black',
    borderWidth: 0.5,
    fontSize: scale(18),
    alignItems: 'center',
  },
  loginButton: {
    height: scale(40),
    width: scale(250),
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(30),
  },
  buttonText: {color: colors.white, fontSize: scale(18), fontWeight: '500'},
  errMsg: {
    color: 'red',
    alignSelf: 'flex-start',
    width: scale(250),
    marginLeft: scale(25),
    marginTop: scale(5),
  },
  container: {
    marginTop: scale(15),
    backgroundColor: 'white',
  },
  dropdown: {
    height: scale(50),
    width: scale(300),
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 9,
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
