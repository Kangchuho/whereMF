import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Header, IconButton, TextButton, CardItem} from '../../components';
import {FONTS, SIZES, COLORS, icons, dummyData} from '../../constants';

const MyCard = ({navigation}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  function renderHeader() {
    return (
      <Header
        title="MY CARDS"
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

  function renderMyCards() {
    return (
      <View>
        {dummyData.myCards.map((item, index) => {
          return (
            <CardItem
              key={`MyCard-${item.id}`}
              item={item} //{...item, key: 'MyCard'}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ==
                `MyCard-${item.id}`
              }
              onPress={() => setSelectedCard({...item, key: 'MyCard'})}
            />
          );
        })}
      </View>
    );
  }

  function renderAddNewCard() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text style={{...FONTS.h3}}>Add new card</Text>
        {dummyData.allCards.map((item, index) => {
          return (
            <CardItem
              key={`NewCard-${item.id}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ==
                `NewCard-${item.id}`
              }
              onPress={() => setSelectedCard({...item, key: 'NewCard'})}
            />
          );
        })}
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <TextButton
          containerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor:
              selectedCard == null ? COLORS.gray3 : COLORS.primary,
          }}
          label={selectedCard?.key == 'NewCard' ? 'Add' : 'Place you Order'}
          disabled={selectedCard == null ? true : false}
          onPress={() => {
            if (selectedCard?.key == 'NewCard') {
              navigation.navigate('AddCard', {selectedCard: selectedCard});
            } else {
              navigation.navigate('Checkout', {selectedCard: selectedCard});
            }
          }}
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
      {/* cards */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}>
        {renderMyCards()}
        {renderAddNewCard()}
      </ScrollView>

      {/* footer */}
      {renderFooter()}
    </View>
  );
};

export default MyCard;
