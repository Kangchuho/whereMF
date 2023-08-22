import {View, Text, Image} from 'react-native';
import React from 'react';

import {images, FONTS, SIZES, COLORS} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AuthLayout = ({title, subtitle, titleContainerStyle, children}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{flex: 1, paddingHorizontal: SIZES.padding}}>
        {/* app icon */}
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.primary,
              paddingLeft: 5,
              borderRadius: 20,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <Image
              source={images.logo_03}
              resizeMode="contain"
              style={{width: 80, height: 80}}
            />
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Text style={{...FONTS.h5, fontSize: 15, color: COLORS.white}}>
                Where is My Food!
              </Text>
              <Text style={{...FONTS.h5, fontSize: 15, color: COLORS.gray3}}>
                Where is My Food!
              </Text>
            </View>
          </View>
        </View>
        {/* title & subtitle */}
        <View style={{marginTop: SIZES.padding, ...titleContainerStyle}}>
          <Text style={{textAlign: 'center', ...FONTS.h2}}>{title}</Text>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.darkGray,
              marginTop: SIZES.base,
              ...FONTS.body3,
            }}>
            {subtitle}
          </Text>
        </View>
        {/* content children */}
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthLayout;
