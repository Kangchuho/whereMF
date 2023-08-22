import {encode, decode} from 'base64-arraybuffer';

//export const PROFILE_SCHEMA = 'Profile';
//export const IMAGES_SCHEMA = 'Images';

// export const ProfileSchema = {
//   name: PROFILE_SCHEMA,
//   primaryKey: 'id',
//   properties: {
//     id: 'int',
//     name: 'string',
//     profile_image: 'Images?',
//     address: 'string',
//   },
// };

export const Image = {
  id: Number,
  name: String,
  url: String,
};

export const ImageSchema = {
  name: 'Image',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    url: 'string',
  },
};
