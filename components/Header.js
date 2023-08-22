import {View, Text} from 'react-native';
import React from 'react';
import {FONTS, SIZES} from '../constants';

const Header = ({
  containerStyle,
  title,
  titleStyle,
  leftComponent,
  rightComponent,
}) => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        ...containerStyle,
      }}>
      {/* left */}
      {leftComponent}
      {/* title */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.h3, ...titleStyle}}>{title}</Text>
      </View>
      {/* right */}
      {rightComponent}
    </View>
  );
};

export default Header;
