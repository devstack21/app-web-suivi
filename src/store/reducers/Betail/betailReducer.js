// rootReducer.js
import { combineReducers } from 'redux';
import listSlice from './listBetailSlice';
import listeTypeBetailSlice from './listeTypeBetailSlice';
// Import other reducers...

const betailReducer = combineReducers({
  list: listSlice,
  type: listeTypeBetailSlice
});

export default betailReducer;
