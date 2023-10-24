// rootReducer.js
import { combineReducers } from 'redux';
import listSlice from './listSlice';
// Import other reducers...

const betailReducer = combineReducers({
  list: listSlice
});

export default betailReducer;
