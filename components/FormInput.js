import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {FONTS, SIZES, COLORS} from '../constants';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholer,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalzie = 'none',
  errorMsg = '',
  value = '',
  maxLength,
}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}>
      {/* label & error message */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: COLORS.gray, ...FONTS.body4}}>{label}</Text>
        <Text style={{color: COLORS.red, ...FONTS.body4}}>{errorMsg}</Text>
      </View>
      {/* textinput */}
      <View
        style={{
          flexDirection: 'row',
          height: SIZES.height > 800 ? 55 : 45,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.height > 800 ? SIZES.base : 0,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          ...inputContainerStyle,
        }}>
        {prependComponent}
        <TextInput
          style={{flex: 1, ...inputStyle}}
          value={value}
          placeholder={placeholer}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalzie}
          autoCompleteType={autoCompleteType}
          maxLength={maxLength}
          onChangeText={text => onChange(text)}
        />
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;
