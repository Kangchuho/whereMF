import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES, icons} from '../constants';

const HorizontalFoodCard = ({containerStyle, imageStyle, item, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image source={item.image} style={imageStyle} />
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 17,
            ...FONTS.h3,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: COLORS.darkGray2,
            ...FONTS.body4,
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text
          style={{
            marginTop: SIZES.base,
            ...FONTS.h2,
          }}>
          {`$${item.price}`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 5,
          right: SIZES.radius,
        }}>
        <Image source={icons.calories} style={{width: 30, height: 30}} />
        <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>
          {item.calories} Calories
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;
