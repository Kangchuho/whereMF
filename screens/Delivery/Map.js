import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import LinearGradient from 'react-native-linear-gradient';
import {IconButton} from '../../components';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  dummyData,
  constants,
} from '../../constants';
import {utils} from '../../utils';

const Map = ({navigation, route}) => {
  const mapView = useRef();
  const [region, setRegion] = useState(null);
  const [toLoc, setToLoc] = useState(null);
  const [fromLoc, setFromLoc] = useState(null);
  const [angle, setAngle] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState('');

  const origin = {
    latitude: 37.3318456,
    longitude: -122.0296002,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };
  const destination = {
    latitude: 37.771707,
    longitude: -122.4053769,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };
  const origin2 = {
    latitude: 37.491118,
    longitude: 126.723031,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const destination2 = {
    latitude: 37.517233,
    longitude: 126.725077,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    let initialRegion = {
      latitude: 37.491118,
      longitude: 126.723031,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };

    // let destination = {
    //   latitude: 37.517233,
    //   longitude: 126.725077,
    // };
    // setToLoc(destination);
    // setFromLoc(dummyData?.fromLocs[4]);
    // setRegion(initialRegion);

    setToLoc(destination);
    setFromLoc(origin);
    setRegion(origin);
    // setToLoc(destination);
    // setFromLoc(dummyData?.fromLocs[4]);
  }, []);

  function renderMap() {
    return (
      <MapView
        ref={mapView}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}>
        {fromLoc && (
          <Marker
            //key={'FromLoc'}
            key={`key_${fromLoc.longitude}_${fromLoc.latitude}`}
            coordinate={fromLoc}
            tracksViewChanges={false}
            icon={icons.location_pin}
            //image={icons.location_pin}
            //style={{width: 26, height: 28}}
            rotation={angle}
            ancher={{x: 0.5, y: 0.5}}>
            <Image
              source={icons.location_pin}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
          </Marker>
        )}
        {toLoc && (
          <Marker
            //key={'ToLoc'}
            key={`key_${toLoc.longitude}_${toLoc.latitude}`}
            coordinate={toLoc}
            tracksViewChanges={false}
            icon={icons.location1}
            ancher={{x: 0.5, y: 0.5}}>
            <Image
              source={icons.location1}
              style={{width: 40, height: 40, tintColor: COLORS.primary}}
              resizeMode="cover"
            />
          </Marker>
        )}
        <MapViewDirections
          origin={fromLoc}
          destination={toLoc}
          apikey={constants.GOOGLE_MAP_API_KEY}
          strokeWidth={3}
          strokeColor={COLORS.primary}
          optimizeWaypoints={true}
          // waypoints={[fromLoc]}
          // timePrecision={'now'}
          // onError={e => {
          //   console.log('error', e);
          // }}

          onReady={result => {
            //console.log(result);
            setDuration(Math.ceil(result.duration));
            if (!isReady) {
              // fit the map base..
              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  rigth: SIZES.width * 0.1,
                  bottom: 350,
                  left: SIZES.width * 0.1,
                  top: SIZES.height * 0.1,
                },
              });
              // repositon th navigator
              if (result.coordinates.length >= 2) {
                let angle = utils.calculateAngle(result.coordinates);
                //console.log(angle);
                setAngle(angle);
                //setAngle(-30);
              }
              setIsReady(true);
            }
          }}
        />
      </MapView>
    );
  }

  function renderHeaderButtons() {
    return (
      <>
        <IconButton
          icon={icons.back}
          containerStyle={{
            position: 'absolute',
            top: SIZES.padding * 2,
            left: SIZES.padding,
            ...styles.buttonStyle,
          }}
          iconStyle={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray2,
          }}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            position: 'absolute',
            top: SIZES.padding * 2,
            right: SIZES.padding,
          }}>
          <IconButton
            icon={icons.globe}
            containerStyle={{
              ...styles.buttonStyle,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
          />
          <IconButton
            icon={icons.focus}
            containerStyle={{
              marginTop: SIZES.radius,
              ...styles.buttonStyle,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
          />
        </View>
      </>
    );
  }

  function renderInfo() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        {/* line gradient */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            right: 0,
            height: Platform.OS === 'ios' ? 200 : 50,
            // borderTopLeftRadius: 15,
            // borderTopRightRadius: 15,
          }}
        />
        {/* info */}
        <View
          style={{
            padding: SIZES.padding,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: COLORS.white,
          }}>
          {/* delivery time */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={icons.clock}
              style={{
                width: 40,
                height: 40,
                tintColor: COLORS.black,
              }}
            />
            <View
              style={{
                marginLeft: SIZES.padding,
              }}>
              <Text style={{color: COLORS.gray, ...FONTS.body4}}>
                Your delibery time
              </Text>
              <Text style={{...FONTS.h3}}>{duration} minut</Text>
            </View>
          </View>
          {/* adress */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.padding,
            }}>
            <Image
              source={icons.focus}
              style={{
                height: 40,
                width: 40,
                tintColor: COLORS.black,
              }}
            />
            <View
              style={{
                marginLeft: SIZES.padding,
              }}>
              <Text style={{color: COLORS.gray, ...FONTS.body4}}>
                Your Adress
              </Text>
              <Text style={{...FONTS.h3}}>88, Jln Padungon, Kuching</Text>
            </View>
          </View>

          {/* delivery man detail */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 70,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={images.profile2}
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
              }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>WMF ets...</Text>
              <Text style={{color: COLORS.white, ...FONTS.body4}}>
                Delivery Weman
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: COLORS.white,
                backgroundColor: COLORS.transparentPrimary,
              }}>
              <Image
                source={icons.call}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.white,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* map */}
      {renderMap()}

      {/* header buttons */}
      {renderHeaderButtons()}

      {/* footer info */}
      {renderInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
  },
});

export default Map;

/*
URL호출 -> JSON
https://maps.googleapis.com/maps/api/directions/json?destination=Montreal&origin=Toronto&key=AIzaSyBxZ_wq6GLJ9ck1N2GN-Xr01biTtjdugAw
*/
