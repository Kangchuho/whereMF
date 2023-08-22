export const User = {
  id: Number,
  name: String,
  nickname: String,
};

export const UserSchema = {
  name: 'User',
  properties: {
    id: 'int',
    name: 'string',
    nickname: 'string',
  },
  primaryKey: 'id',
};
