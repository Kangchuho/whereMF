import React from 'react';
import {View, Text, ImageBackground, Image, Animated} from 'react-native';
import {TextButton} from '../../components';
import {COLORS, SIZES, FONTS, images, constants} from '../../constants';

const OnBoarding = ({navigation}) => {
  const scrollX = new Animated.Value(0);
  const flatListRef = React.useRef();
  const Dots = () => {
    const dotPostion = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {constants.onboarding_screens.map((item, index) => {
          const dotColor = dotPostion.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.lightOrange,
              COLORS.primary,
              COLORS.lightOrange,
            ],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPostion.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  function renderHeaderLogo() {
    return (
      <View
        style={{
          position: 'absolute',
          top: SIZES.height > 800 ? 50 : 25,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.logo_03}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.5,
            height: 170,
          }}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={{height: 160, width: '100%'}}>
        {/* pagenation, dots */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Dots />
        </View>
        {/* buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding,
            marginVertical: SIZES.padding,
          }}>
          <TextButton
            label="Skep"
            containerStyle={{backgroundColor: null}}
            labelStyle={{color: COLORS.darkGray2, ...FONTS.body3}}
            onPress={() => navigation.navigate('SignIn')}
          />
          <TextButton
            label="Next"
            containerStyle={{
              height: 60,
              width: 200,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              let index = Math.ceil(Number(scrollX._value / SIZES.width));
              if (index < constants.onboarding_screens.length - 1) {
                //scroll to the next item
                flatListRef?.current?.scrollToIndex({
                  index: index + 1,
                  animatied: true,
                });
              } else {
                navigation.replace('SignIn');
              }
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
      }}>
      {renderHeaderLogo()}
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={constants.onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {useNativeDriver: false},
        )}
        keyExtractor={item => `onboarding-${item.id}`}
        renderItem={({item, index}) => {
          return (
            <View style={{width: SIZES.width}}>
              {/* header */}
              <View style={{flex: 3}}>
                <ImageBackground
                  source={item.backgroundImage}
                  style={{
                    flex: 1,
                    width: SIZES.width,
                    height: 554,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -SIZES.padding * 3,
                  }}>
                  <Image
                    source={item.bannerImage}
                    resizeMode="contain"
                    style={{
                      width: SIZES.width * 0.8,
                      height: SIZES.width * 0.8,
                      marginBottom: -SIZES.padding * 13,
                    }}
                  />
                </ImageBackground>
              </View>
              {/* detail */}
              <View
                style={{
                  flex: 1,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.radius,
                }}>
                <Text style={{...FONTS.h1, fontSize: 25}}>{item.title}</Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: 'center',
                    color: COLORS.darkGray,
                    paddingHorizontal: SIZES.padding,
                    ...FONTS.body3,
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </View>
  );
};

export default OnBoarding;
