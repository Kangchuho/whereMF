import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  dummyData,
  constants,
} from '../../constants';
import {
  IconButton,
  TwoPointSlider,
  TextButton,
  TextIconButton,
} from '../../components';
import {color} from 'react-native-reanimated';

const Section = ({contanerStyle, title, children}) => {
  return (
    <View style={{marginTop: SIZES.padding, ...contanerStyle}}>
      <Text style={{...FONTS.h3}}>{title}</Text>
      {children}
    </View>
  );
};

const FilterModal = ({isVisble, onClose}) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisble);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [deliveryTime, setDeliveryTime] = useState('');
  const [ratings, setRatings] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  function renderDistande() {
    return (
      <Section title="Distance">
        <View style={{alignItems: 'center'}}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={value => console.log(value)}
          />
        </View>
      </Section>
    );
  }

  function renderDeliverTime() {
    return (
      <Section title="Delivery Time" contanerStyle={{marginTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: SIZES.radius,
          }}>
          {constants.delivery_time.map((item, index) => {
            return (
              <TextButton
                key={`delivery-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == deliveryTime ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                containerStyle={{
                  width: '30%',
                  height: 50,
                  margin: 5,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                onPress={() => setDeliveryTime(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  function renderPricingRange() {
    return (
      <Section title="Pricing Range">
        <View style={{alignItems: 'center'}}>
          <TwoPointSlider
            values={[10, 50]}
            min={1}
            max={100}
            prefix="$"
            postfix=""
            onValuesChange={values => console.log(values)}
          />
        </View>
      </Section>
    );
  }

  function renderRatings() {
    return (
      <Section title="Ratings">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {constants.ratings.map((item, index) => {
            return (
              <TextIconButton
                key={`Raiting-${index}`}
                containerStyle={{
                  flex: 1,
                  height: 50,
                  margin: 5,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == ratings ? COLORS.primary : COLORS.lightGray2,
                }}
                label={item.label}
                labelStyle={{
                  color: item.id == ratings ? COLORS.white : COLORS.gray2,
                }}
                icon={icons.star}
                iconStyle={{
                  tintColor: item.id == ratings ? COLORS.white : COLORS.gray2,
                }}
                onPress={() => setRatings(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  function renderTags() {
    return (
      <Section title="Tags">
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {constants.tags.map((item, index) => {
            return (
              <TextButton
                key={`tags-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == tags ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                containerStyle={{
                  height: 50,
                  margin: 5,
                  paddingHorizontal: SIZES.padding,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == tags ? COLORS.primary : COLORS.lightGray2,
                }}
                onPress={() => setTags(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  }

  return (
    <Modal animationType="fade" transparent={true} visble={isVisble}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack7,
        }}>
        {/* transparent background */}
        <TouchableWithoutFeedback
          onPress={() => {
            setShowFilterModal(false);
            //onClose();
            console.log('TouchableWithoutFeedback press');
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                fontSize: 18,
              }}>
              Filter Your Search
            </Text>
            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{tintColor: COLORS.gray2}}
              onPress={() => setShowFilterModal(false)}
            />
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}>
            {/* Distance Section */}
            {renderDistande()}
            {/* delivery time */}
            {renderDeliverTime()}
            {/* pricing range */}
            {renderPricingRange()}
            {/* ratings */}
            {renderRatings()}
            {/* tags */}
            {renderTags()}
          </ScrollView>
          {/* apply button */}
          <View
            style={{
              position: 'absolute',
              bottom: 100,
              left: 0,
              right: 0,
              height: 150,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
            }}>
            <TextButton
              label="Apply Filter"
              containerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                console.log('Apply Filter');
                setShowFilterModal(false);
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
