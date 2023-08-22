import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
  Header,
  LineDivider,
  TextButton,
  TextIconButton,
} from '../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  constants,
  dummyData,
} from '../../constants';

const DeliveryStatus = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(3);
  const [foodItem, setFoodItem] = useState(dummyData.vegBiryani);

  function renderHeader() {
    return (
      <Header
        title="DELIVERY STATUS"
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
        }}
      />
    );
  }

  function randerInfo() {
    return (
      <View style={{marginTop: SIZES.radius, paddingHorizontal: SIZES.padding}}>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.gray,
            ...FONTS.body4,
          }}>
          Estimated Delivery
        </Text>
        <Text style={{textAlign: 'center', ...FONTS.h2}}>
          9 Sept 2022 / 12:30PM
        </Text>
      </View>
    );
  }

  function renderTrackOrder() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          backgroundColor: COLORS.white2,
        }}>
        {/* track order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: SIZES.padding,
          }}>
          <Text style={{...FONTS.h3}}>Track Order</Text>
          <Text style={{color: COLORS.gray, ...FONTS.body3}}>NY021234</Text>
        </View>

        <LineDivider lineStyle={{backgroundColor: COLORS.lightGray2}} />
        {/* status */}
        <View
          style={{marginTop: SIZES.padding, paddingHorizontal: SIZES.padding}}>
          {constants.track_order_status.map((item, index) => {
            return (
              <View key={`StatusList-${index}`}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                  }}>
                  <Image
                    source={icons.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentStep
                          ? COLORS.primary
                          : COLORS.lightGray1,
                    }}
                  />
                  <View style={{marginLeft: SIZES.radius}}>
                    <Text style={{...FONTS.h3}}>{item.title}</Text>
                    <Text style={{color: COLORS.gray, ...FONTS.body4}}>
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < constants.track_order_status.length - 1 && (
                  <View>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: COLORS.primary,
                          zIndex: -1,
                        }}
                      />
                    )}
                    {index >= currentStep && (
                      <Image
                        source={icons.dotted_line}
                        resizeMode="cover"
                        style={{
                          width: 4,
                          height: 50,
                          marginLeft: 17,
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
        }}>
        {currentStep < constants.track_order_status.length - 1 && (
          <View
            style={{
              flexDirection: 'row',
              height: 55,
              justifyContent: 'space-between',
            }}>
            <TextButton
              label="Cancel"
              containerStyle={{
                width: '40%',
                borderRadius: SIZES.base,
                backgroundColor: COLORS.lightGray2,
              }}
              labelStyle={{color: COLORS.primary}}
              onPress={() => navigation.replace('Home')}
            />
            <TextIconButton
              label="View Map"
              labelStyle={{color: COLORS.white, ...FONTS.h3}}
              icon={icons.map}
              iconPosition="LEFT"
              iconStyle={{
                tintColor: COLORS.white,
                width: 25,
                height: 25,
                marginRight: SIZES.base,
              }}
              containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => navigation.navigate('Map')}
            />
          </View>
        )}
        {currentStep == constants.track_order_status.length - 1 && (
          <TextButton
            containerStyle={{height: 55, borderRadius: SIZES.base}}
            label="DONE"
            onPress={() => navigation.navigate('FoodDetail', {item: foodItem})}
          />
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
      }}>
      {/* header */}
      {renderHeader()}
      {/* info */}
      {randerInfo()}
      {/* track order */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTrackOrder()}
      </ScrollView>
      {/* footer */}
      {renderFooter()}
    </View>
  );
};

export default DeliveryStatus;
