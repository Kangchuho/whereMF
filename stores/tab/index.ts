import { combineReducers } from "redux";
import tab from './tab';
import auth from '../auth/auth'

const rootReducer = combineReducers({
  tab, auth
});

export type RootState = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export default rootReducer;
