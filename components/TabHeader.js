import {View, Text} from 'react-native';
import React from 'react';
import {FONTS} from '../constants';

const TabHeader = ({contanerStyle, title, leftComponent, rightComponent}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between',
        ...contanerStyle,
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
        <Text style={{...FONTS.h3}}>{title}</Text>
      </View>
      {/* right */}
      {rightComponent}
    </View>
  );
};

export default TabHeader;
