import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, StatusBar} from 'react-native';
import {COLORS, FONTS, SIZES, icons, dummyData, images} from '../../constants';
import {
  Header,
  IconButton,
  CartQuantityButton,
  IconLabel,
  TextButton,
  LineDivider,
  Rating,
  StepperInput,
} from '../../components';

import {LogBox} from 'react-native';
import {getImage} from '../../context/controllers/RealmController';
import {encode, decode} from 'base64-arraybuffer';
import {Buffer} from 'buffer';
import ImgToBase64 from 'react-native-image-base64';
import RNFS from 'react-native-fs';

//LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

const FoodDetail = ({navigation, route}) => {
  const [foodItem, setFoodItem] = useState(dummyData.vegBiryani);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [datatoImg, setDatatoImg] = useState(null);

  useEffect(() => {
    const {item} = route.params;
    setFoodItem(item);

    // ImgToBase64.getBase64String('file://intra.martpia.co.kr/img/logo_03.gif')
    //   .then(base64String => setDatatoImg(base64String))
    //   .catch(err => console.log(err));

    const inits = async () => {
      //   //
      // const selimage = await getImage(16);
      // console.log('url:', selimage.url);
      // //   //console.log(await getImage(24)[0]);
      // console.log('buffer:', Buffer(selimage.url));
      // console.log('arraybuffer:', arrayBufferToBase64(selimage.url));
      // //setDatatoImg(selimage.url);
      // setDatatoImg(arrayBufferToBase64(selimage.url));
      // ImgToBase64.getBase64String('../assets/icons/apple.png')
      //   .then(base64String => setDatatoImg(base64String))
      //   .catch(err => console.log(err));
      //base64 res
      // const data = await RNFS.readFile(
      //   'file://assets/icons/apple.png',
      //   'base64',
      // ).then(res => {
      //   return res;
      // });
      // setDatatoImg(data);
    };

    inits();
  }, []);

  function arrayBufferToBase64(a) {
    const buffer = Buffer.from(a);
    const base64String = buffer.toString('base64');
    return base64String;
  }

  function renderHeader() {
    return (
      <Header
        title="DETAILS"
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<CartQuantityButton quantity={7} />}
      />
    );
  }

  function renderDetails() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* food card */}
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: COLORS.lightGray2,
          }}>
          {/* calories & favourite */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.base,
              paddingHorizontal: SIZES.radius,
            }}>
            {/* calories */}
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image source={icons.calories} style={{width: 30, height: 30}} />
              <Text
                style={{
                  color: COLORS.darkGray2,
                  ...FONTS.body4,
                }}>
                {foodItem?.calories} calories
              </Text>
            </View>

            {/* fivourite */}
            <Image
              source={icons.love}
              style={{
                tintColor: foodItem?.isFavourite ? COLORS.primary : COLORS.gary,
                width: 20,
                height: 20,
              }}
            />
          </View>
          {/* food image */}
          <Image
            source={foodItem?.image}
            //source={datatoImg}
            //source={icons.apple}
            // source={{
            //   uri: `data:image/png;base64,${datatoImg}`,
            // }}
            resizeMode="contain"
            style={{
              width: '100%',
              height: 170,
            }}
          />
        </View>

        {/* food info */}
        <View
          style={{
            marginTop: SIZES.padding,
          }}>
          {/* name description */}
          <Text style={{...FONTS.h1}}>{foodItem?.name}</Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              textAlign: 'justify',
              ...FONTS.body3,
            }}>
            {foodItem?.description}
          </Text>

          {/* ratings, duration, shipping */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
            }}>
            {/* ratings */}
            <IconLabel
              containerStyle={{
                backgroundColor: COLORS.primary,
              }}
              icon={icons.star}
              label="4.5"
              labelStyle={{
                color: COLORS.white,
              }}
            />
            {/* duration */}
            <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.clock}
              iconStyle={{tintColor: COLORS.back}}
              label="30 Mins"
            />
            {/* shipping */}
            <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.dollar}
              iconStyle={{tintColor: COLORS.black}}
              label="Free Shipping"
            />
          </View>

          {/* size */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.h3}}>Size: </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: SIZES.padding,
              }}>
              {dummyData.sizes.map((item, index) => {
                return (
                  <TextButton
                    key={`Sizes-${index}`}
                    label={item.label}
                    containerStyle={{
                      width: 55,
                      height: 55,
                      margin: SIZES.base,
                      borderWidth: 1,
                      borderRadius: SIZES.radius,
                      borderColor:
                        selectedSize == item.id ? COLORS.primary : COLORS.gray2,
                      backgroundColor:
                        selectedSize == item.id ? COLORS.primary : null,
                    }}
                    labelStyle={{
                      color:
                        selectedSize == item.id ? COLORS.white : COLORS.gray2,
                      ...FONTS.body2,
                    }}
                    onPress={() => setSelectedSize(item.id)}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderRestaurant() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        <Image
          source={dummyData.myProfile2?.profile_image}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
          }}
        />
        {/* info */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h3}}>ByYourMarket</Text>
          <Text style={{color: COLORS.gary, ...FONTS.body4}}>
            1.2 KM away from you
          </Text>
        </View>
        {/* rating */}
        <Rating
          rating={1}
          iconStyle={{
            marginLeft: 3,
          }}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 110,
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}>
        <StepperInput
          value={qty}
          onAdd={() => setQty(qty + 1)}
          onMinus={() => {
            if (qty > 1) {
              setQty(qty - 1);
            }
          }}
        />
        {/* add cart */}
        <TextButton
          containerStyle={{
            flex: 1,
            flexDirection: 'row',
            height: 60,
            marginLeft: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          label="Buy Now"
          label2="$15.89"
          // label2Style={{
          //   marginLeft: SIZES.base,
          // }}
          onPress={() => navigation.navigate('MyCart')}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      {/* safe area */}
      <View
        style={{
          flex: 1,
          marginTop: 40,
          // paddingHorizontal: SIZES.padding,
        }}>
        {/* header */}
        {renderHeader()}
        {/* body */}
        <ScrollView>
          {renderDetails()}
          <LineDivider lineStyle={{marginTop: 0}} />
          {/* rastaurant */}
          {renderRestaurant()}
          <LineDivider lineStyle={{marginTop: 0}} />
        </ScrollView>
        {/* footer */}
        {renderFooter()}
      </View>
    </View>
  );
};

export default FoodDetail;
