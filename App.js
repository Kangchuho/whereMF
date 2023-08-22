import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {OnBoarding} from './screens';
import CustomDrawer from './navigation/CustomDrawer';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
//import rootReducer from './stores/rootReducer';
import rootReducer from './stores/tab/index';
import SplashScreen from 'react-native-splash-screen';
import {
  SignIn,
  ForgotPassword,
  SignUp,
  Otp,
  FoodDetail,
  MyCart,
  MyCard,
  AddCard,
  Checkout,
  Success,
  DeliveryStatus,
  Map,
} from './screens';

//모든 화면에서 이객체로 처리한다?
//import getRealm from './context/realm';
//컨트롤러로 해도 되는데.. 오류가
import {createImage} from './context/controllers/RealmController';
import {encode, decode} from 'base64-arraybuffer';

import {icons} from './constants';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Require cycle:']);

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

const App = () => {
  let initialRoute = 'Home';
  if (1 == 1) {
    //초기 안내를 안본경우, 앱을 지우고 다시설치 한경우. (쿠키로 저장?)
    initialRoute = 'OnBoarding';
  } else {
    initialRoute = 'Home';
  }

  const initRealm = async () => {
    //img -> base64 string 변환이 관건!
    //기본 스키마를 생성합니다.
    //console.log(encode(icons.apple));
    let image = {
      id: 0,
      name: `profile`,
      url: encode(icons.apple), //Image_SCHEMA
    };
    //await createImage(image);
    //직접구현
    // const realm = await getRealm();
    // const images = realm.objects('Image').sorted('id', true);
    // let newid = images.length == 0 ? 1 : images[0].id + 1;
    // //realm.close();
    // let image = {
    //   id: newid,
    //   name: `profile_${newid}`,
    //   url: require('./assets/dummyData/wrap_sandwich.png'), //Image_SCHEMA
    // };

    // try {
    //   realm.write(async () => {
    //     await realm.create('Image', image);
    //   });
    //   console.log('Create new image successful!', image);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  React.useEffect(() => {
    SplashScreen.hide();
    // async () => {
    //   initRealm();
    // };
    // try {
    initRealm();
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={initialRoute}>
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="Home"
            component={CustomDrawer}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="FoodDetail"
            component={FoodDetail}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="MyCart"
            component={MyCart}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="MyCard"
            component={MyCard}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            screenOptions={{Headers: false}}
          />
          <Stack.Screen
            name="Success"
            component={Success}
            screenOptions={{Headers: false}}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name="DeliveryStatus"
            component={DeliveryStatus}
            screenOptions={{Headers: false}}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            screenOptions={{Headers: false}}
          />
          {/* <Stack.Screen
            name="NaverMap"
            component={NaverMap}
            screenOptions={{Headers: false}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
