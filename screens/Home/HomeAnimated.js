import {useDrawerStatus} from '@react-navigation/drawer';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {COLORS, SIZES} from '../../constants';

const HomeAnimated = (proprs, {drawerAnimationStyle}) => {
  const isDrawerOpen = useDrawerStatus();
  const sv = useSharedValue(0);

  useEffect(() => {
    if (isDrawerOpen === 'open') {
      sv.value = withTiming(1);
      //console.log('Drawer open', screenStyle);
    } else {
      sv.value = withTiming(0);
      //console.log('Drawer close', screenStyle);
    }
  }, [isDrawerOpen]);

  const screenStyle = useAnimatedStyle(() => {
    const scale = interpolate(sv.value, [0, 0.5, 1], [1, 0.9, 0.8], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    const borderRadius = interpolate(sv.value, [0, 1], [1, 20], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    return {
      transform: [{scale}],
      borderRadius,
    };
  });

  return (
    <Animated.View style={[styles.view, screenStyle]}>
      <Text
        style={{
          color: COLORS.black,
          fontSize: SIZES.h1,
        }}>
        Home1
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default HomeAnimated;
