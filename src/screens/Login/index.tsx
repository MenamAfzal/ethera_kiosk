import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {colors} from '../../theme';
import Logo from '../../components/Logo';
import {loginUser} from '../../redux/actions/authActions';
import {getLocation} from '../../redux/actions/getLocations';

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
  const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn);
  const token = useSelector(state => state?.auth?.userToken);

  const submitHandler = (values: {email: string; password: string}) => {
    //@ts-ignore
    dispatch(loginUser(values));
  };

  const isAuthenticated = async () => {
    if (isLoggedIn) {
      await AsyncStorage.setItem('token', token);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, [isLoggedIn]);

  useEffect(() => {
    console.log('in use');
    //@ts-ignore
    dispatch(getLocation());
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.baseContainer}>
        <View
          style={{
            marginTop: scale(60),
          }}>
          <Logo />
        </View>

        <Text style={styles.loginText}>Please Login</Text>
        <Formik
          initialValues={{email: 'meenam@gmail.com', password: '123456'}}
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
                  autoCapitalize="words"
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

              <View style={styles.inputView}>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.bodyTextColor,
                    paddingHorizontal: scale(10),
                    flexGrow: 1,
                  }}>
                  Select Location
                </Text>
                <FontAwesome
                  name="sort-down"
                  size={24}
                  color="black"
                  style={{paddingHorizontal: scale(10)}}
                />
              </View>

              <TouchableOpacity
                //@ts-ignore
                onPress={handleSubmit}>
                <View style={styles.loginButton}>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
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
    fontSize: 28,
    color: 'black',
    marginTop: scale(15),
    fontWeight: '500',
  },
  input: {
    flexGrow: 1,
    textAlignVertical: 'center',
    fontSize: 20,
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
    fontSize: 20,
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
  buttonText: {color: colors.white, fontSize: 18, fontWeight: '500'},
  errMsg: {
    color: 'red',
    alignSelf: 'flex-start',
    width: scale(250),
    marginLeft: scale(25),
    marginTop: scale(5),
  },
});
