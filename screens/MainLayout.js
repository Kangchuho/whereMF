import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';

import {HomeScreen, Search, CartTab, Favourite, Notification} from '../screens';
import {COLORS, FONTS, SIZES, icons, constants, dummyData} from '../constants';

import {useSelector, useDispatch} from 'react-redux';
import {TabHeader} from '../components';
import {setMenu} from '../stores/tab/tab';
import LinearGradient from 'react-native-linear-gradient';

const TabButton = ({
  label,
  icon,
  isFocused,
  outerContainerStyle,
  innerContainerStyle,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          outerContainerStyle,
        ]}>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: '80%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            },
            innerContainerStyle,
          ]}>
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              tintColor: isFocused ? COLORS.white : COLORS.gray,
            }}
          />
          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({navigation}, props) => {
  const flatListRef = React.useRef();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setMenu({
        name: constants.screens.home,
      }),
    );
  }, []);

  // Reanimated Shared Value : TabButton
  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);
  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.white);
  const favouriteTabFlex = useSharedValue(1);
  const favouriteTabColor = useSharedValue(COLORS.white);
  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(COLORS.white);
  // Reanimated Animated Style
  const homeFlexStyle = useAnimatedStyle(() => {
    return {flex: homeTabFlex.value};
  });
  const homeColorStyle = useAnimatedStyle(() => {
    return {backgroundColor: homeTabColor.value};
  });
  const searchFlexStyle = useAnimatedStyle(() => {
    return {flex: searchTabFlex.value};
  });
  const searchColorStyle = useAnimatedStyle(() => {
    return {backgroundColor: searchTabColor.value};
  });
  const cartFlexStyle = useAnimatedStyle(() => {
    return {flex: cartTabFlex.value};
  });
  const cartColorStyle = useAnimatedStyle(() => {
    return {backgroundColor: cartTabColor.value};
  });
  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {flex: favouriteTabFlex.value};
  });
  const favouriteColorStyle = useAnimatedStyle(() => {
    return {backgroundColor: favouriteTabColor.value};
  });
  const notificationFlexStyle = useAnimatedStyle(() => {
    return {flex: notificationTabFlex.value};
  });
  const notificationColorStyle = useAnimatedStyle(() => {
    return {backgroundColor: notificationTabColor.value};
  });

  // mainLayout Animated values
  const progress = useDrawerProgress();
  const screenStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.5, 1], [1, 0.9, 0.8], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    const borderRadius = interpolate(progress.value, [0, 1], [1, 20], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    return {
      transform: [{scale}],
      borderRadius,
    };
  });

  const menu = useSelector(state => state.tab.menu);

  //태버튼 초화값 반영하기
  React.useEffect(() => {
    if (menu.name == constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
      homeTabFlex.value = withTiming(4, {duration: 500});
      homeTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      homeTabFlex.value = withTiming(1, {duration: 500});
      homeTabColor.value = withTiming(COLORS.white, {duration: 500});
    }
    if (menu.name == constants.screens.search) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      searchTabFlex.value = withTiming(4, {duration: 500});
      searchTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      searchTabFlex.value = withTiming(1, {duration: 500});
      searchTabColor.value = withTiming(COLORS.white, {duration: 500});
    }
    if (menu.name == constants.screens.cart) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      });
      cartTabFlex.value = withTiming(4, {duration: 500});
      cartTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      cartTabFlex.value = withTiming(1, {duration: 500});
      cartTabColor.value = withTiming(COLORS.white, {duration: 500});
    }
    if (menu.name == constants.screens.favourite) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: false,
      });
      favouriteTabFlex.value = withTiming(4, {duration: 500});
      favouriteTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      favouriteTabFlex.value = withTiming(1, {duration: 500});
      favouriteTabColor.value = withTiming(COLORS.white, {duration: 500});
    }
    if (menu.name == constants.screens.notification) {
      flatListRef?.current?.scrollToIndex({
        index: 4,
        animated: false,
      });
      notificationTabFlex.value = withTiming(4, {duration: 500});
      notificationTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      notificationTabFlex.value = withTiming(1, {duration: 500});
      notificationTabColor.value = withTiming(COLORS.white, {duration: 500});
    }
  }, [menu.name]);

  return (
    <>
      <Animated.View style={[styles.animatedView, screenStyle]}>
        {/* header */}
        <TabHeader
          contanerStyle={{
            height: 50,
            paddingHorizontal: SIZES.padding,
            marginTop: 40,
          }}
          title={menu?.name.toUpperCase()}
          leftComponent={
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: COLORS.gray2,
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.openDrawer()}>
              <Image source={icons.menu} />
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity onPress={() => {}}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: SIZES.radius,
                  borderWidth: 1,
                  borderColor: COLORS.gray2,
                  borderRadius: SIZES.radius,
                }}
                source={dummyData?.myProfile2.profile_image}
              />
            </TouchableOpacity>
          }
        />
        {/* content */}
        <View style={{flex: 1}}>
          <FlatList
            style={{
              flex: 1,
              // width: SIZES.width,
              // height: SIZES.height,
              // backgroundColor: COLORS.gray3,
            }}
            ref={flatListRef}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={SIZES.width}
            showsHorizontalScrollIndicator={false}
            data={constants.bottom_tabs}
            key={item => `${item.id}`}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    height: SIZES.height,
                    width: SIZES.width,
                  }}>
                  {item.label == constants.screens.home && <HomeScreen />}
                  {item.label == constants.screens.search && <Search />}
                  {item.label == constants.screens.cart && <CartTab />}
                  {item.label == constants.screens.favourite && <Favourite />}
                  {item.label == constants.screens.notification && (
                    <Notification />
                  )}
                </View>
              );
            }}
          />
        </View>
        {/* footer */}
        <View
          style={{
            height: 100,
            justifyContent: 'flex-end',
          }}>
          {/* shadow */}
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 4}}
            colors={[COLORS.transparent, COLORS.blue]}
            style={{
              position: 'absolute',
              top: -20,
              left: 0,
              right: 0,
              //height: 100,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 25,
              height: Platform.OS === 'ios' ? 120 : 100,
            }}
          />
          {/* Tabs */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: SIZES.radius,
              paddingBottom: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 25,
              backgroundColor: COLORS.white,
            }}>
            <TabButton
              label={constants.screens.home}
              icon={icons.home}
              isFocused={menu.name == constants.screens.home}
              outerContainerStyle={homeFlexStyle}
              innerContainerStyle={homeColorStyle}
              onPress={() =>
                dispatch(
                  setMenu({
                    name: constants.screens.home,
                  }),
                )
              }
            />
            <TabButton
              label={constants.screens.search}
              icon={icons.search}
              isFocused={menu.name == constants.screens.search}
              outerContainerStyle={searchFlexStyle}
              innerContainerStyle={searchColorStyle}
              onPress={() =>
                dispatch(
                  setMenu({
                    name: constants.screens.search,
                  }),
                )
              }
            />
            <TabButton
              label={constants.screens.cart}
              icon={icons.cart}
              isFocused={menu.name == constants.screens.cart}
              outerContainerStyle={cartFlexStyle}
              innerContainerStyle={cartColorStyle}
              onPress={() =>
                dispatch(
                  setMenu({
                    name: constants.screens.cart,
                  }),
                )
              }
            />
            <TabButton
              label={constants.screens.favourite}
              icon={icons.favourite}
              isFocused={menu.name == constants.screens.favourite}
              outerContainerStyle={favouriteFlexStyle}
              innerContainerStyle={favouriteColorStyle}
              onPress={() =>
                dispatch(
                  setMenu({
                    name: constants.screens.favourite,
                  }),
                )
              }
            />
            <TabButton
              label={constants.screens.notification}
              icon={icons.notification}
              isFocused={menu.name == constants.screens.notification}
              outerContainerStyle={notificationFlexStyle}
              innerContainerStyle={notificationColorStyle}
              onPress={() =>
                dispatch(
                  setMenu({
                    name: constants.screens.notification,
                  }),
                )
              }
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});

export default MainLayout;
