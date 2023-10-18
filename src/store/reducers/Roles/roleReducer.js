// rootReducer.js
import { combineReducers } from 'redux';
import listReducer from './listSlice';
// Import other reducers...

const roleReducer = combineReducers({
  list: listReducer,
  // Add other slices here...
});

export default roleReducer;
