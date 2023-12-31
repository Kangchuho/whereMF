import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS} from '../constants';

const TextButton = ({
  label,
  labelStyle,
  containerStyle,
  disabled,
  onPress,
  label2 = '',
  label2Style,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        ...containerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
        }}>
        {label}
      </Text>
      {label2 != '' && (
        <Text
          style={{
            flex: 1,
            textAlign: 'right',
            color: COLORS.white,
            ...FONTS.h3,
            ...label2Style,
          }}>
          {label2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
