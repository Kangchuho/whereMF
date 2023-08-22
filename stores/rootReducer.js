import {combineReducers} from 'redux';
import {tabReducer, authReducer} from './tab';

export default combineReducers({
  tabReducer,
  authReducer,
});
