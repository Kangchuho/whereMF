import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import AuthLayout from './AuthLayout';
import {TextButton, FormInput, TextIconButton} from '../../components';
import {utils} from '../../utils';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  function isEnableEmail() {
    return email != '' && emailError == '';
  }

  return (
    <AuthLayout
      title="Recover Password"
      subtitle="Please enter your email address to recover your password"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}>
      {/* form input  */}
      <View style={{flex: 1, marginTop: SIZES.padding * 2}}>
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
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
      </View>
      {/* button  */}
      <TextButton
        label="Send Email"
        disabled={isEnableEmail() ? false : true}
        containerStyle={{
          height: 50,
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: isEnableEmail()
            ? COLORS.primary
            : COLORS.transparentPrimary,
        }}
        labelStyle={{
          color: COLORS.white,
          ...FONTS.h3,
        }}
        onPress={() => navigation.navigate('SignIn')}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
