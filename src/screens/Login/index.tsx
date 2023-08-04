import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
// import {zodResolver} from '@hookform/resolvers/zod';
// import {useForm} from 'react-hook-form';
// import * as z from 'zod';
import {Entypo} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';

import {colors} from '../../theme';
import Logo from '../../components/Logo';

// const schema = z.object({
//   cnic: z.string({
//     required_error: 'Please Enter Your CNIC Number',
//   }),
//   firstName: z.string({
//     required_error: 'First Name is required',
//   }),
//   lastName: z.string({
//     required_error: 'Last Name is required',
//   }),
//   email: z
//     .string({
//       required_error: 'Email is required',
//     })
//     .email('Invalid email format'),
//   bikeNumber: z.string({
//     required_error: 'Bike Number is required',
//   }),
// });

// export type FormType = z.infer<typeof schema>;

const Login = () => {
  const navigation = useNavigation();

  // const {handleSubmit, control, setValue, setError, formState, resetField} =
  //   useForm<FormType>({
  //     resolver: zodResolver(schema),
  //   });

  const onLoginPress = () => {
    //@ts-ignore
    navigation.navigate('CheckIn');
  };
  return (
    <View style={styles.baseContainer}>
      <View
        style={{
          marginTop: scale(60),
        }}>
        <Logo />
      </View>

      <Text style={styles.loginText}>Please Login</Text>
      <View style={styles.inputView}>
        <View style={{borderRightColor: colors.black, borderRightWidth: 0.5}}>
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
          onChangeText={text => {}}
          // value={description}
          underlineColorAndroid="transparent"></TextInput>
      </View>
      <View style={styles.inputView}>
        <View style={{borderRightColor: colors.black, borderRightWidth: 0.5}}>
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
          placeholderTextColor={colors.bodyTextColor}
          multiline={true}
          style={styles.input}
          onChangeText={text => {}}
          // value={description}
          underlineColorAndroid="transparent"></TextInput>
      </View>
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
        {/* <FontAwesome
          name="sort-down"
          size={24}
          color="black"
          style={{paddingHorizontal: scale(10)}}
        /> */}
      </View>

      <TouchableOpacity onPress={onLoginPress}>
        <View style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
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
});
