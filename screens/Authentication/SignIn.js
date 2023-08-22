import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {AuthLayout} from '../';
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from '../../components';
import {FONTS, SIZES, COLORS, icons} from '../../constants';
import {utils} from '../../utils';

//사용자 로그인처리
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../stores/auth/auth';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saveMe, setSaveMe] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.name);
  const menu = useSelector(state => state.tab.name);

  function isEnableSignIn() {
    return (
      email != '' && password != '' && emailError == '' && passwordError == ''
    );
  }

  return (
    <AuthLayout
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title="Let's Sign You In"
      subtitle="Welcome back, you've been missed">
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}>
        {/* form inputs */}
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
                      ? COLORS.gray
                      : email != '' && emailError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <Text>{auth?.name}</Text>
        <Text>{menu?.name}</Text>
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
        {/* save me & forgot ForgotPassword */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <CustomSwitch value={saveMe} onChange={value => setSaveMe(value)} />
          <TextButton
            label="Forgot Password?"
            labelStyle={{color: COLORS.gray, ...FONTS.body4}}
            containerStyle={{
              backgroundColor: null,
            }}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}
          />
        </View>
        {/* sign in */}
        <TextButton
          label="Sign In"
          disabled={isEnableSignIn() ? false : true}
          containerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => {
            dispatch(
              setLogin({
                name: email,
              }),
            );
            console.log(menu?.name);
            navigation.replace('Home');
          }}
        />
        {/* sign up */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
            Don't have an account?
          </Text>
          <TextButton
            label="Sign Up"
            containerStyle={{
              backgroundColor: null,
              marginLeft: SIZES.base,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
      {/* footer */}
      {/* style={{position: 'absolute', bottom: 20}} */}
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

export default SignIn;
