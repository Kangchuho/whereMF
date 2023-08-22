import React, {useState, useEffect} from 'react';
import {View, Text, Image, BackHandler, TextBase} from 'react-native';
import {COLORS, images, SIZES, FONTS} from '../../constants';
import {TextButton} from '../../components';

const Success = ({navigation}) => {
  useEffect(() => {
    //안드로이드 뒤로가가 버튼클릭 방지하기!!
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={images.success} style={{width: 150, height: 150}} />
        <Text style={{marginTop: SIZES.padding, ...FONTS.h1}}>
          Congratulations!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: SIZES.base,
            color: COLORS.darkGray,
            ...FONTS.body3,
          }}>
          Payment was successfuly made!
        </Text>
      </View>
      <TextButton
        containerStyle={{
          marginBottom: SIZES.padding,
          height: 55,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        label="Done"
        onPress={() => navigation.replace('DeliveryStatus')}
      />
    </View>
  );
};

export default Success;
