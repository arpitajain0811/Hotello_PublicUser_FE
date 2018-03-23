import { combineReducers } from 'redux';
import searchOptions from './searchOptions';
import storeHotels from './storeHotels';
import userReducer from './user';
import manageRooms from './manageRooms';

export default combineReducers({
  searchOptions,
  storeHotels,
  userReducer,
  manageRooms,
});
