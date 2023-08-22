import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

import {COLORS, SIZES, FONTS, icons} from '../constants';

const Rating = ({
  rating,
  iconStyle,
  activeColor = COLORS.orange,
  inactiveColor = COLORS.lightOrange3,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 1 ? activeColor : inactiveColor,
          ...styles.rateIcons,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 2 ? activeColor : inactiveColor,
          ...styles.rateIcons,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 3 ? activeColor : inactiveColor,
          ...styles.rateIcons,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 4 ? activeColor : inactiveColor,
          ...styles.rateIcons,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 5 ? activeColor : inactiveColor,
          ...styles.rateIcons,
          ...iconStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rateIcons: {
    height: 15,
    width: 15,
  },
});

export default Rating;
