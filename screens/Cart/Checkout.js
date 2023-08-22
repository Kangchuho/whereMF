import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Header,
  IconButton,
  FormInput,
  CardItem,
  FooterTotal,
} from '../../components';

const Checkout = ({navigation, route}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [couponcd, setCouponcd] = useState('');
  useEffect(() => {
    let {selectedCard} = route.params;
    setSelectedCard(selectedCard);
  }, []);
  function renderHeader() {
    return (
      <Header
        title="CHECKOUT"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40,
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
        rightComponent={<View style={{width: 40}}></View>}
      />
    );
  }

  function renderBody() {
    return (
      <View>
        {/* card */}
        <View>
          {selectedCard &&
            dummyData.myCards.map((item, index) => {
              return (
                <CardItem
                  key={`MyCard-${item.id}`}
                  item={item}
                  isSelected={
                    `${selectedCard?.key}-${selectedCard?.id}` ==
                    `MyCard-${item.id}`
                  }
                  onPress={() => setSelectedCard({...item, key: 'MyCard'})}
                />
              );
            })}
        </View>
        {/* delivery */}
        {renderDeliveryAddr()}
        {/* coupon */}
        {renderCoupon()}
      </View>
    );
  }

  function renderDeliveryAddr() {
    return (
      <View style={{marginTop: SIZES.padding}}>
        <Text style={{...FONTS.h3}}>Delivery Address</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.radius,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderWidth: 2,
            borderRadius: SIZES.radius,
            borderColor: COLORS.lightGray2,
          }}>
          <Image
            source={icons.location1}
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Text
            style={{...FONTS.body3, width: '85%', marginLeft: SIZES.radius}}>
            300 Post Street San Francisco, CA
          </Text>
        </View>
      </View>
    );
  }

  function renderCoupon() {
    return (
      <View style={{marginTop: SIZES.padding}}>
        <Text style={{...FONTS.h3}}>Add Coupon</Text>
        <FormInput
          inputContainerStyle={{
            marginTop: 0,
            paddingLeft: SIZES.padding,
            paddingRight: 0,
            borderWidth: 2,
            borderColor: COLORS.lightGray2,
            backgroundColor: COLORS.white,
            overflow: 'hidden',
          }}
          placeholer="Cupon Code."
          appendComponent={
            <View
              style={{
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Image source={icons.discount} style={{height: 40, width: 40}} />
            </View>
          }
          onChange={value => setCouponcd(value)}
          value={couponcd}
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
      {/* header */}
      {renderHeader()}
      {/* body */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraScrollHeight={-200}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 20,
        }}>
        {renderBody()}
      </KeyboardAwareScrollView>
      {/* footer */}
      <FooterTotal
        subTotal={37.12}
        shippingFee={0.0}
        total={37.12}
        onPress={() => navigation.replace('Success')}
      />
    </View>
  );
};

export default Checkout;
