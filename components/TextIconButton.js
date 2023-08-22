import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS} from '../constants';

const TextIconButton = ({
  label,
  labelStyle,
  containerStyle,
  icon,
  iconPosition,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: COLORS.primary,
        ...containerStyle,
      }}
      onPress={onPress}>
      {iconPosition == 'LEFT' && (
        <Image
          source={icon}
          style={{
            ...styls.image,
            ...iconStyle,
          }}
        />
      )}
      <Text
        style={{
          ...FONTS.body3,
          ...labelStyle,
        }}>
        {label}
      </Text>
      {(iconPosition == 'RIGHT' || iconPosition == null) && (
        <Image
          source={icon}
          style={{
            ...styls.image,
            ...iconStyle,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styls = StyleSheet.create({
  image: {
    marginLeft: 5,
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
});
export default TextIconButton;
