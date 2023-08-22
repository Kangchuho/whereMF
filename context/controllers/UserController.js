import User, {UserSchema} from '../models/User';
import Realm from 'realm';

let realm = new Realm({path: 'realmdb.user', schema: [UserSchema]});

// result: boolean
export const createUser = user => {
  // check if hero already existed?
  user.id = generateId();
  //   if (checkIfTaskExists(task.id)) {
  //      return false;
  //     //   msg.message = `Hero with id=${hero.heroId} existed!`;
  //     //   return msg;
  //   }

  try {
    realm.write(async () => {
      await realm.create('User', user);
    });
    console.log('Create new hero successful!', user);
    return user;
  } catch (e) {
    return null;
  }
};

export const generateId = () => {
  let users = realm.objects('User');
  if (users.length == 0) return 1;

  let sortedUsers = users.sorted('id', true); // sort by id descending;
  let firstUser = sortedUsers[0];
  return firstUser.id + 1;
  //return tasks.length+1;
};

const checkIfTaskExists = id => {
  let user = getUserById(id);
  return user != null;
};

// result: realm object
export const getUserById = id => {
  //let msg = new Message();
  let users = realm.objects('User');
  let findUser = users?.filtered(`id=${id}`); // return collections
  if (findUser.length == 0) {
    return null;
    //msg.message = `Not found hero with id=${id}`;
  } else {
    return findUser[0];
  }
};

export const getAllUsers = () => {
  let users = realm.objects('User');
  return users;
};

export const newrealm = () => {
  return new Realm({path: 'realmdb.user', schema: [UserSchema]});
};

export const updateUser = user => {
  if (!user) {
    return false;
  }

  let findUser = getUserById(user.id).result;
  if (!findUser) {
    // msg.result = false;
    // msg.message = `Not found hero with id=${hero.heroId}`;
    // return msg;
  }

  try {
    realm.write(() => {
      user.updateObjectInfo(findUser);
    });

    console.log(`Update hero with id=${user.id} successful`);
  } catch (e) {
    console.log(`Update hero with id=${user.id} failed: ${e.message}`);
  } finally {
  }
};

export const deleteUser = user => {
  if (!user) {
    return false;
  }

  realm.write(() => {
    try {
      let selUser = realm.objectForPrimaryKey('User', user.id);
      realm.delete(selUser);
    } catch (error) {
      console.log('delete', error);
    }
  });
};
