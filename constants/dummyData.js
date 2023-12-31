import {icons, images} from './';

const myProfile = {
  name: 'ByProgrammers',
  profile_image: images.profile,
  address: 'No. 88, Jln Padungan, Kuching',
};

const myProfile2 = {
  name: 'W.M.F',
  profile_image: images.profile2,
  address: 'No. 88, Jln Padungan, Kuching',
};

const categories = [
  {
    id: 1,
    name: 'Fast Food',
    icon: icons.burger,
  },
  {
    id: 2,
    name: 'Fruit Item',
    icon: icons.cherry,
  },
  {
    id: 3,
    name: 'Rice Item',
    icon: icons.rice,
  },
];

const hamburger = {
  id: 1,
  name: 'Hamburger',
  description:
    'Chicken patty hamburger mixed favoured rice dish which is typically',
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/hamburger.png'),
};

const hotTacos = {
  id: 2,
  name: 'Hot Tacos',
  description:
    'Mexican tortilla & tacos mixed favoured rice dish which is typically',
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
  image: require('../assets/dummyData/hot_tacos.png'),
};

const vegBiryani = {
  id: 3,
  name: 'Veg Biryani',
  description:
    'A popular spice and vegetables mixed favoured rice dish which is typically prepared by layering the biryani gravy and basmati rice in flat bottom vessel.',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/veg_biryani.png'),
};

const wrapSandwich = {
  id: 4,
  name: 'Wrap Sandwich',
  description:
    'Grilled vegetables rice dish which is typically prepared by layering the biryani gravy and basmati rice in flat sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/wrap_sandwich.png'),
};

const selectedMenu = [hamburger, hotTacos, vegBiryani, wrapSandwich];

const menu = [
  {
    id: 1,
    name: 'Featured',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 2,
    name: 'Nearby you',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 3,
    name: 'Popular',
    list: [hamburger, hotTacos, wrapSandwich],
  },
  {
    id: 4,
    name: 'Newest',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 5,
    name: 'Trending',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 6,
    name: 'Recommended',
    list: [hamburger, hotTacos, wrapSandwich],
  },
];

const sizes = [
  {
    id: 1,
    label: '12"',
  },
  {
    id: 2,
    label: '14"',
  },
  {
    id: 3,
    label: '16"',
  },
  {
    id: 4,
    label: '18"',
  },
];

const myCart = [
  {
    ...hamburger,
    qty: 2,
  },
  {
    ...hotTacos,
    qty: 1,
  },
  {
    ...vegBiryani,
    qty: 4,
  },
];

const myCards = [
  {
    id: 1,
    name: 'Master Card',
    icon: require('../assets/icons/mastercard.png'),
    card_no: '1234',
  },
  {
    id: 2,
    name: 'Google Pay',
    icon: require('../assets/icons/google.png'),
    card_no: '1234',
  },
];

const allCards = [
  {
    id: 1,
    name: 'Apple Pay',
    icon: require('../assets/icons/apple.png'),
  },
  {
    id: 2,
    name: 'Visa',
    icon: require('../assets/icons/visa.png'),
  },
  {
    id: 3,
    name: 'PayPal',
    icon: require('../assets/icons/paypal.png'),
  },
  {
    id: 4,
    name: 'Google Pay',
    icon: require('../assets/icons/google.png'),
  },
  {
    id: 5,
    name: 'Master Card',
    icon: require('../assets/icons/mastercard.png'),
  },
];

const fromLocs = [
  {
    latitude: 37.517595,
    longitude: 126.721103,
  },
  {
    latitude: 37.491118,
    longitude: 126.723031,
  },
  {
    latitude: 37.477625,
    longitude: 126.692677,
  },
  {
    latitude: 37.46213,
    longitude: 126.645924,
  },
  {
    latitude: 37.3804,
    longitude: 126.658,
  },
  {
    latitude: 37.517595,
    longitude: 126.721103,
  },
];

export default {
  myProfile,
  myProfile2,
  categories,
  menu,
  selectedMenu,
  vegBiryani,

  sizes,
  myCart,
  myCards,
  allCards,
  fromLocs,
};
