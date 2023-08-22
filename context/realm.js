import Realm from 'realm';
import {ImageSchema} from './models/allSchemas';

const getRealm = () =>
  Realm.open({
    path: 'myfoodrealm',
    schema: [ImageSchema],
    schemaVersion: 1,
  });

export default getRealm;
