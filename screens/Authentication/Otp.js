import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import AuthLayout from './AuthLayout';
import {TextButton, FormInput, TextIconButton} from '../../components';
import {utils} from '../../utils';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Otp = ({navigation}) => {
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /*
  일부오류가 있다는 분의 피드백, 지금은 잘동작!!
  1) clearInterval이 후크에서 작동하지 않습니다... 필요합니다. >> 
  const [intervalId, setIntervalId] = useState(0); 
  2) 사용자가 다른 화면으로 이동하면 clearInterval이 필요합니다.   
  const initTimer =()=> setIntervalId( setInterval(()=>{
     console.log('____interval___', Math.random());
   }, 1000) );
  const clearTimer = ()=>clearInterval(intervalId);
  useEffect(()=>{
     isFocused ? initTimer() : clearTimer() ;
   }, [isFocused]);
  */

  //뒤로가기 할시 abc
  //Sending `onAnimatedValueUpdate` with no listeners registered. 메시지가 난다..

  return (
    <AuthLayout
      title="OTP Authentication"
      subtitle="An authentication code has been sent to your mail"
      titleContianerStyle={{
        marginTop: SIZES.padding * 2,
      }}>
      {/* otp input */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}>
        <OTPInputView
          pinCount={4}
          style={{
            width: '100%',
            height: 50,
          }}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            color: COLORS.black,
            ...FONTS.h3,
          }}
          onCodeFilled={code => console.log(code)}
        />

        {/* count down timer */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: SIZES.padding,
          }}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
            Din't receive code?
          </Text>
          <TextButton
            label={`Resend (${timer})s`}
            disabled={timer == 0 ? false : true}
            containerStyle={{
              backgroundColor: null,
              marginLeft: SIZES.base,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => setTimer(60)}
          />
        </View>
      </View>
      {/* footer */}
      <View>
        <TextButton
          label="Continue"
          containerStyle={{
            height: 50,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => console.log('Countinue')}
        />
        <View style={{marginTop: SIZES.padding, alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            By siging up, you agree to our.
          </Text>
          <TextButton
            label="Terms and Conditions"
            containerStyle={{
              marginLeft: SIZES.base,
              backgroundColor: null,
              marginBottom: SIZES.padding,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}
            onPress={() => console.log('tearms and condtions')}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default Otp;
