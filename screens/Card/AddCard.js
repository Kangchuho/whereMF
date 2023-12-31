import React, {useState, useEffect} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, FONTS, SIZES, icons, images} from '../../constants';
import {utils} from '../../utils';
import {
  FormInput,
  Header,
  IconButton,
  TextButton,
  FormInputCheck,
  RadioButton,
} from '../../components';

const AddCard = ({navigation, route}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNameError, setCardNameError] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    let {selectedCard} = route.params;
    setSelectedCard(selectedCard);
  }, []);

  function isEnableAddCard() {
    return (
      cardNumber != '' &&
      cardName != '' &&
      expiryDate != '' &&
      cvv != '' &&
      cardNumberError == '' &&
      cardNameError == '' &&
      expiryDateError == '' &&
      cvvError == ''
    );
  }

  function renderHeader() {
    return (
      <Header
        title="ADD NEW CARD"
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
  function renderCard() {
    return (
      <ImageBackground
        source={images.card}
        style={{
          height: 200,
          width: '100%',
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          overflow: 'hidden',
        }}>
        {/* logo */}
        <Image
          source={selectedCard?.icon}
          resizeMode="contain"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            height: 40,
            width: 80,
          }}
        />
        {/* detail */}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}>
            {cardName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body3,
              }}>
              {cardNumber}
            </Text>
            <Text style={{color: COLORS.white, ...FONTS.body3}}>
              {expiryDate}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
  function renderForms() {
    return (
      <View style={{marginTop: SIZES.padding * 2}}>
        <FormInput
          label="Card Number"
          keyboardType="number-pad"
          maxLength={19}
          value={cardNumber}
          onChange={value => {
            setCardNumber(
              value
                .replace(/\s/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim(),
            );
            //setCardNumber(value);
            utils.validateInput(value, 19, setCardNumberError);
          }}
          errorMsg={cardNumberError}
          appendComponent={
            <FormInputCheck value={cardNumber} error={cardNumberError} />
          }
        />

        <FormInput
          label="Cardholder Name"
          value={cardName}
          containerStyle={{marginTop: SIZES.radius}}
          onChange={value => {
            setCardName(value);
            utils.validateInput(value, 1, setCardNameError);
          }}
          errorMsg={cardNameError}
          appendComponent={
            <FormInputCheck value={cardName} error={cardNameError} />
          }
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <FormInput
            label="Expiry Day"
            value={expiryDate}
            placeholer="MM/YY"
            maxLength={5}
            containerStyle={{flex: 1}}
            onChange={value => {
              utils.validateInput(value, 5, setExpiryDateError);
              setExpiryDate(value);
            }}
            errorMsg={expiryDateError}
            appendComponent={
              <FormInputCheck value={expiryDate} error={expiryDateError} />
            }
          />
          <FormInput
            label="CVV"
            value={cvv}
            containerStyle={{flex: 1, marginLeft: SIZES.radius}}
            maxLength={3}
            onChange={value => {
              utils.validateInput(value, 3, setCvvError);
              setCvv(value);
            }}
            errorMsg={cvvError}
            appendComponent={<FormInputCheck value={cvv} error={cvvError} />}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            marginTop: SIZES.padding,
          }}>
          <RadioButton
            label="Remember this card details."
            isSelected={isRemember}
            onPress={() => {
              setIsRemember(!isRemember);
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
        backgroundColor: COLORS.white,
      }}>
      {/* header */}
      {renderHeader()}
      {/* body */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* card */}
        {renderCard()}
        {/* forms */}
        {renderForms()}
      </KeyboardAwareScrollView>
      {/* footer */}
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
            backgroundColor: isEnableAddCard()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          label="Add Card"
          disabled={isEnableAddCard() ? false : true}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default AddCard;
