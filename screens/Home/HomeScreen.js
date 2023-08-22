import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES, icons, FONTS, dummyData} from '../../constants';
import {HorizontalFoodCard, VerticalFoodCard} from '../../components';
import {FilterModal} from '../index';
import {useNavigation} from '@react-navigation/native';

const Section = ({title, onPress, children}) => {
  return (
    <View>
      {/* header */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}>
        <Text style={{flex: 1, ...FONTS.h3}}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{color: COLORS.primary, ...FONTS.body3}}>Show All</Text>
        </TouchableOpacity>
      </View>
      {/* content */}
      {children}
    </View>
  );
};

const HomeScreen = ({}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [popular, setPopular] = useState([]);

  const [showFilterModal, setShowFilterModal] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    handleChangeCategroy(selectedCategoryId, selectedMenuType);
  }, []);
  //handle
  const handleChangeCategroy = (categoryId, menuTypeId) => {
    // Retrieve the recomment menu
    let selecedRecommend = dummyData.menu.find(a => a.name == 'Recommended');
    //Find the menu based on the menuType
    let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);
    //Find popular menu item
    let selectedPopular = dummyData.menu.find(a => a.name == 'Popular');

    //Set the menu based on the catagroyId, recommend, popular
    setMenuList(
      selectedMenu?.list.filter(b => b.categories.includes(categoryId)),
    );
    setRecommends(
      selecedRecommend?.list
        .filter(b => b.categories.includes(categoryId))
        .sort((a, b) => (a.id < b.id ? 1 : -1)),
    );
    setPopular(
      selectedPopular?.list
        .filter(b => b.categories.includes(categoryId))
        .sort((a, b) => (a.id > b.id ? 1 : -1)),
    );
  };

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          width: '90%',
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        {/* icon */}
        <Image
          source={icons.search}
          style={{height: 20, width: 20, tintColor: COLORS.black}}
        />
        {/* text input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="search food.."
        />
        {/* filter button */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 30, marginBottom: 20}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index == dummyData.menu.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() => {
                setSelectedMenuType(item.id);
                handleChangeCategroy(selectedCategoryId, item.id);
              }}>
              <Text
                style={{
                  color:
                    selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                  ...FONTS.h3,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function renderRecommentedSection() {
    //console.log(recommends);
    return (
      <Section
        title="Recommend"
        onPress={() => console.log('Show all recommdened')}>
        <FlatList
          data={recommends}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 180,
                  width: SIZES.width * 0.85,
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight:
                    index == recommends.length - 1 ? SIZES.padding : 0,
                  paddingRight: SIZES.radius,
                  alignItems: 'center',
                }}
                imageStyle={{
                  marginTop: 35,
                  height: 150,
                  width: 150,
                }}
                item={item}
                onPress={() => navigation.navigate('FoodDetail', {item})}
              />
            );
          }}
        />
      </Section>
    );
  }

  function renderPopularSection() {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log('Show All Popular item..')}>
        <FlatList
          data={popular}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight:
                    index == recommends.length - 1 ? SIZES.padding : 0,
                }}
                item={item}
                onPress={() => navigation.navigate('FoodDetail', {item})}
              />
            );
          }}
        />
      </Section>
    );
  }

  function renderFoodCategrores() {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 55,
                marginTop: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.categories.length.length - 1
                    ? SIZES.padding
                    : 0,
                paddingHorizontal: 8,
                borderRadius: SIZES.radius,
                backgroundColor:
                  selectedCategoryId == item.id
                    ? COLORS.primary
                    : COLORS.lightGray2,
              }}
              onPress={() => {
                setSelectedCategoryId(item.id);
                handleChangeCategroy(item.id, selectedMenuType);
              }}>
              <Image
                source={item.icon}
                style={{width: 50, height: 50, marginTop: 5}}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  marginRight: SIZES.base,
                  color:
                    selectedCategoryId == item.id
                      ? COLORS.white
                      : COLORS.darkGray,
                  ...FONTS.h3,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function renderDeliveryTo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3,
          }}>
          DELIVERY TO
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3}}>{dummyData?.myProfile2.address}</Text>
          <Image
            source={icons.down_arrow}
            style={{
              tintColor: COLORS.primary,
              width: 20,
              height: 20,
              marginLeft: SIZES.base,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      {/* serch & filter modal */}
      {renderSearch()}
      {showFilterModal && (
        <FilterModal
          isVisble={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* deliverty, foodcategroes, populer, recommended, menulist */}
      <FlatList
        data={menuList}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* delivery */}
            {renderDeliveryTo()}
            {/* food categories */}
            {renderFoodCategrores()}
            {/* pouplar */}
            {renderPopularSection()}
            {/* recommended */}
            {renderRecommentedSection()}
            {/* menu type */}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              item={item}
              onPress={() => {
                //console.log('HorizontalFoodCard');
                navigation.navigate('FoodDetail', {item});
              }}
            />
          );
        }}
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </View>
  );
};

export default HomeScreen;
