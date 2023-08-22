import React, {useState, useRef, useEffect} from 'react';

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
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

const NaverMap = () => {
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

  function MyMap() {
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};

    return (
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{...P0, zoom: 16}}
        onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="red"
          onClick={() => console.warn('onClick! p2')}
        />
        <Path
          coordinates={[P0, P1]}
          onClick={() => console.warn('onClick! path')}
          width={10}
        />
        <Polyline
          coordinates={[P1, P2]}
          onClick={() => console.warn('onClick! polyline')}
        />
        <Circle
          coordinate={P0}
          color={'rgba(255,0,0,0.3)'}
          radius={200}
          onClick={() => console.warn('onClick! circle')}
        />
        <Polygon
          coordinates={[P0, P1, P2]}
          color={`rgba(0, 0, 0, 0.5)`}
          onClick={() => console.warn('onClick! polygon')}
        />
      </NaverMapView>
    );
  }

  return <View style={{flex: 1}}>{MyMap()}</View>;
};

export default NaverMap;
