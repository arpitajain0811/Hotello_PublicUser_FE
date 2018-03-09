import { combineReducers } from 'redux';
import searchOptions from './searchOptions';
import storeHotels from './storeHotels';

export default combineReducers({
  searchOptions,
  storeHotels,
});
