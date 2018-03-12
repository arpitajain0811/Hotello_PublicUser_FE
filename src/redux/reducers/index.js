import { combineReducers } from 'redux';
import searchOptions from './searchOptions';
import storeHotels from './storeHotels';
import userReducer from './user';

export default combineReducers({
  searchOptions,
  storeHotels,
  userReducer,
});
