import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {FONTS, COLORS, SIZES, icons, dummyData} from '../../constants';
import {
  Header,
  IconButton,
  CartQuantityButton,
  StepperInput,
  FooterTotal,
} from '../../components';
import {SwipeListView} from 'react-native-swipe-list-view';

const MyCart = ({navigation}) => {
  const [myCartList, setMyCartList] = useState(dummyData.myCart);

  //handler
  function updateQuantityHandler(newQty, id) {
    const newMyCartList = myCartList.map(cl =>
      cl.id === id ? {...cl, qty: newQty} : cl,
    );
    setMyCartList(newMyCartList);
  }
  function removeMyCartHandler(id) {
    let newMyCartList = [...myCartList];
    const index = newMyCartList.findIndex(cart => cart.id === id);
    newMyCartList.splice(index, 1);
    setMyCartList(newMyCartList);
  }
  //render
  function renderHeader() {
    return (
      <Header
        title="MY CART"
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
        rightComponent={<CartQuantityButton quantity={3} />}
      />
    );
  }

  function renderCartList() {
    return (
      <SwipeListView
        data={myCartList}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          paddingBottom: SIZES.padding * 2,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={(data, rowMap) => (
          <View
            style={{
              height: 100,
              backgroundColor: COLORS.lightGray2,
              ...styles.cartItemContiner,
            }}>
            <View
              style={{
                width: 90,
                height: 100,
                marginLeft: -10,
                // borderColor: COLORS.black,
                // borderWidth: 1,
              }}>
              <Image
                source={data.item.image}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 10,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={{...FONTS.body3}}>{data.item.name}</Text>
              <Text style={{color: COLORS.primary, ...FONTS.h3}}>
                ${data.item.price}
              </Text>
            </View>
            <StepperInput
              containerStyle={{
                height: 50,
                width: 125,
                backgroundColor: COLORS.white,
              }}
              value={data.item.qty}
              onAdd={() =>
                updateQuantityHandler(data.item.qty + 1, data.item.id)
              }
              onMinus={() => {
                if (data.item.qty > 1) {
                  updateQuantityHandler(data.item.qty - 1, data.item.id);
                }
              }}
            />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            containerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: COLORS.primary,
              ...styles.cartItemContiner,
            }}
            icon={icons.delete_icon}
            iconStyle={{marginRight: 10, tintColor: COLORS.white}}
            onPress={() => removeMyCartHandler(data.item.id)}
          />
        )}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* Header */}
      {renderHeader()}
      {/* cart list */}
      {renderCartList()}
      {/* footer */}
      <FooterTotal
        subTotal={65.3}
        shippingFee={0.0}
        total={65.3}
        onPress={() => navigation.navigate('MyCard')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});

export default MyCart;
