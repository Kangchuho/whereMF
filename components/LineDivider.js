import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const LineDivider = ({lineStyle}) => {
  return (
    <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: COLORS.lightGray2,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderTopColor: 'rgba(0,0,0,0.1)',
        // borderBottomColor: COLORS.lightGray2,
        ...lineStyle,
      }}
    />
  );
};

export default LineDivider;
