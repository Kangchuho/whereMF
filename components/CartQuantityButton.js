import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const CartQuantityButton = ({containerStyle, iconStyle, quantity, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightOrange2,
        ...containerStyle,
      }}>
      <Image
        source={icons.cart}
        style={{height: 20, width: 20, tintColor: COLORS.black, ...iconStyle}}
      />
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          height: 15,
          width: 15,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.white,
            lineHeight: 0,
            fontSize: 10,
          }}>
          {quantity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartQuantityButton;
