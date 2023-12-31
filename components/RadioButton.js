import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants';

const RadioButton = ({
  containerStyle,
  label,
  labelStyle,
  iconStyle,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={isSelected ? icons.check_on : icons.check_off}
        style={{
          marginLeft: 5,
          width: 20,
          height: 20,
          ...iconStyle,
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.radius,
          color: COLORS.gray,
          ...FONTS.body3,
          ...labelStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// const RadioButton = ({isSelected}) => {
//   return (
//     <TouchableOpacity
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//       }}>
//       <Image
//         source={isSelected ? icons.check_on : icons.check_off}
//         style={{
//           width: 20,
//           height: 20,
//         }}
//       />
//       <Text
//         style={{
//           marginLeft: SIZES.radius,
//         }}>
//         Remember this card details.
//       </Text>
//     </TouchableOpacity>
//   );
// };

export default RadioButton;
