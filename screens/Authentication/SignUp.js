import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import AuthLayout from './AuthLayout';
import {TextButton, FormInput, TextIconButton} from '../../components';
import {utils} from '../../utils';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function isEnableSignUp() {
    return (
      email != '' &&
      username != '' &&
      password != '' &&
      emailError == '' &&
      passwordError == '' &&
      usernameError == ''
    );
  }

  return (
    <AuthLayout
      title="Getting Started"
      subtitle="Create an account to continue!"
      titleContainerStyle={{
        marginTop: SIZES.radius,
      }}>
      {/* form input and sing up */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
        }}>
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          value={email}
          onChange={value => {
            //validate email
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View style={{justifyContent: 'center'}}>
              <Image
                source={
                  email == '' || (email != '' && emailError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ''
                      ? COLORS.gary
                      : email != '' && emailError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Username"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          value={username}
          onChange={value => {
            setUsername(value);
          }}
          errorMsg={usernameError}
          appendComponent={
            <View style={{justifyContent: 'center'}}>
              <Image
                source={
                  username == '' || (username != '' && usernameError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    username == ''
                      ? COLORS.gray
                      : username != '' && usernameError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Password"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{marginTop: SIZES.radius}}
          value={password}
          onChange={value => {
            //validation pwd
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          errorMsg={passwordError}
          appendComponent={
            <TouchableOpacity
              style={{
                //borderWidth: 1,
                height: '100%',
                //width: 20,
                //alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />
        {/* sign in & sign up */}
        <TextButton
          label="Sign Up"
          disabled={isEnableSignUp() ? false : true}
          containerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => navigation.navigate('Otp')}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
            Already have an account?
          </Text>
          <TextButton
            label="Sing In"
            containerStyle={{
              marginLeft: SIZES.base,
              backgroundColor: null,
            }}
            labelStyle={{color: COLORS.primary, ...FONTS.h3}}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      {/* footer */}
      <View>
        <TextIconButton
          containerStyle={{
            height: 50,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.blue,
          }}
          icon={icons.fb}
          iconPosition="LEFT"
          iconStyle={{tintColor: COLORS.white}}
          label="Continue With Facebook"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: COLORS.white,
          }}
          onPress={() => console.log('facebook')}
        />
        <TextIconButton
          containerStyle={{
            marginTop: SIZES.radius,
            height: 50,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
          }}
          icon={icons.google}
          iconPosition="LEFT"
          iconStyle={{tintColor: null}}
          label="Continue With Google"
          labelStyle={{
            marginLeft: SIZES.radius,
          }}
          onPress={() => console.log('google')}
        />
      </View>
    </AuthLayout>
  );
};

export default SignUp;
