// rootReducer.js
import { combineReducers } from 'redux';
import districtsSlice from './districtsSlice';
import villeSlice from './villeSlice';
import regionSlice from './regionSlice';
// Import other reducers...

const locationReducer = combineReducers({
 
  disctricts: districtsSlice,
  region: regionSlice,
  villes: villeSlice
});

export default locationReducer;
