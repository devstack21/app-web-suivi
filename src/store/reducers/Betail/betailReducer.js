// rootReducer.js
import { combineReducers } from 'redux';
import listBetailSlice from './listBetailSlice';
import listeTypeBetailSlice from './listeTypeBetailSlice';
import listToutBetail from './listToutBetail';
// import listSlice from './listBetailSlice';
// import listeTypeBetailSlice from './listeTypeBetailSlice';
// Import other reducers...

const betailReducer = combineReducers({
  list: listBetailSlice,
  type: listeTypeBetailSlice,
  listTout: listToutBetail
});

export default betailReducer;
