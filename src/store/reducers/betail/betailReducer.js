// rootReducer.js
import { combineReducers } from 'redux';
import listBetailSlice from './listBetailSlice';


const betailReducer = combineReducers({
  list: listBetailSlice,
});

export default betailReducer;
