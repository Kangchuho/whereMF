import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawercContentScrollView,
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';

import {MainLayout} from '../screens';
import {COLORS, FONTS, SIZES, constants, icons, dummyData} from '../constants';
import Animated, {color} from 'react-native-reanimated';
import {HomeScreen, FoodDetail} from '../screens';

import {useDispatch, useSelector} from 'react-redux';
import {setMenu} from '../stores/tab/tab';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = ({navigation}) => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.tab.menu);

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}>
        {/* close button */}
        <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.closeDrawer()}>
            <Image
              source={icons.cross}
              style={{height: 35, width: 35, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
        {/* profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}
          onPress={() => console.log('Profile2')}>
          <Image
            source={dummyData.myProfile2?.profile_image}
            style={{
              width: 50,
              height: 50,
              borderRadius: SIZES.radius,
            }}
          />
          <View
            style={{
              marginLeft: SIZES.radius,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {dummyData.myProfile2?.name}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
              }}>
              View your profile
            </Text>
          </View>
        </TouchableOpacity>
        {/* drawer items */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
          }}>
          <CustomDrawerItem
            label={constants.screens.home}
            icon={icons.home}
            isFocused={menu?.name == constants.screens.home}
            onPress={() => {
              dispatch(
                setMenu({
                  name: constants.screens.home,
                }),
              );
              navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.mywallet}
            icon={icons.wallet}
            isFocused={menu?.name == constants.screens.mywallet}
            onPress={() => {
              dispatch(
                setMenu({
                  name: constants.screens.mywallet,
                }),
              );
              navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={menu?.name == constants.screens.notification}
            onPress={() => {
              dispatch(
                setMenu({
                  name: constants.screens.notification,
                }),
              );
              navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={menu?.name == constants.screens.favourite}
            onPress={() => {
              dispatch(
                setMenu({
                  name: constants.screens.favourite,
                }),
              );
              navigation.navigate('MainLayout');
            }}
          />
          {/* line divider */}
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />
          <CustomDrawerItem
            label="Track Your Order"
            icon={icons.location}
            isFocused={menu?.name == 'Track Your Order'}
            onPress={() => {
              dispatch(
                setMenu({
                  name: 'Track Your Order',
                }),
              );
              navigation.navigate('HomeScreen');
            }}
          />
          <CustomDrawerItem
            label="Coupon"
            icon={icons.coupon}
            isFocused={menu?.name == 'Coupon'}
            onPress={() => {
              dispatch(
                setMenu({
                  name: 'Coupon',
                }),
              );
              //navigation.navigate('HomeScreen');
            }}
          />
          <CustomDrawerItem
            label="Settings"
            icon={icons.setting}
            isFocused={menu?.name == 'Settings'}
            onPress={() => {
              dispatch(
                setMenu({
                  name: 'Settings',
                }),
              );
              //navigation.navigate('HomeScreen');
            }}
          />
          <CustomDrawerItem
            label="Invite a Friend"
            icon={icons.profile}
            isFocused={menu?.name == 'Invite a Friend'}
            onPress={() => {
              dispatch(
                setMenu({
                  name: 'Invite a Friend',
                }),
              );
              //navigation.navigate('HomeScreen');
            }}
          />
          <CustomDrawerItem
            label="Help Center"
            icon={icons.help}
            isFocused={menu?.name == 'Help Center'}
            onPress={() => {
              dispatch(
                setMenu({
                  name: 'Help Center',
                }),
              );
            }}
          />
        </View>

        <View
          style={{
            marginBottom: SIZES.padding,
          }}>
          <CustomDrawerItem
            label="Logout"
            icon={icons.logout}
            isFocused={menu?.name == 'Logout'}
            onPress={() => {
              dispatch(
                setMenu({
                  name: 'Logout',
                }),
              );
              navigation.navigate('SignIn');
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawerItem = ({label, icon, isFocused, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          height: 20,
          width: 20,
          tintColor: COLORS.white,
        }}
      />
      <Text
        style={{
          color: COLORS.white,
          paddingLeft: SIZES.radius,
          ...FONTS.h3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawer = () => {
  //setSelectedTab('Home');
  //console.log('selectedTab', selectedTab);
  const [progress, setProgress] = useState(new Animated.Value(0));
  //const progress = useDrawerProgress();
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = {
    borderRadius,
    transform: [{scale}],
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Drawer.Navigator
        screenOptions={{
          overlayColor: 'transparent',
          drawerType: 'slide',
          drawerStyle: {
            flex: 1,
            width: '65%',
            paddingRight: 20,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {backgroundColor: 'transparent'},
          headerShown: false,
        }}
        initialRouteName="MainLayout"
        drawerContent={props => {
          // setTimeout(() => {
          //   setProgress(props.progress);
          //   //   //console.log('progress:', progress);
          // }, 1);
          return <CustomDrawerContent navigation={props.navigation} />;
          //console.log('props', props.state.key);
        }}>
        <Drawer.Screen name="MainLayout">
          {props => <MainLayout {...props} />}
        </Drawer.Screen>
        <Drawer.Screen name="HomeScreen">
          {props => <HomeScreen {...props} />}
        </Drawer.Screen>
        {/* <Drawer.Screen name="FoodDetail">
          {props => <FoodDetail {...props} />}
        </Drawer.Screen> */}
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;

// function mapStateToProps(state) {
//   //console.log('mapStateToProps', state);
//   return {
//     seletedTab: state.tabReducer.seletedTab,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     setSelectedTab: selectedTab => {
//       //console.log('mapDispatchToProps', selectedTab);
//       return dispatch(setSelectedTab(selectedTab));
//     },
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
