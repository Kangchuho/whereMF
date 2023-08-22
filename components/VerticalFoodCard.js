import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES, icons} from '../constants';

const VerticalFoodCard = ({containerStyle, item, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: 215,
        padding: SIZES.padding - 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* calories */}
      <View style={{flexDirection: 'row'}}>
        {/* calories */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={icons.calories} style={{width: 25, height: 25}} />
          <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>
            {item.calories} Calories
          </Text>
        </View>
        {/* favourite */}
        <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite ? COLORS.primary : COLORS.gray,
          }}
        />
      </View>
      {/* image */}
      <View
        style={{
          height: 150,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item.image}
          style={{
            height: 130,
            width: 130,
          }}
        />
      </View>

      {/* info */}
      <View
        style={{
          alignItems: 'center',
          marginTop: -20,
        }}>
        <Text style={{...FONTS.h3}}>{item.name}</Text>
        <Text
          style={{
            color: COLORS.darkGray2,
            textAlign: 'center',
            ...FONTS.body5,
            fontSize: 11,
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text
          style={{
            marginTop: SIZES.radius,
            ...FONTS.h3,
          }}>
          {`$${item.price}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
