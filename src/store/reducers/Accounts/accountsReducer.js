// rootReducer.js
import { combineReducers } from 'redux';
import listReducer from './listSlice';
import createSlice from './createSlice';
import editSlice from './editSlice';
// Import other reducers...

const accountsReducer = combineReducers({
  create: createSlice,
  edit: editSlice,
  list: listReducer
});

export default accountsReducer;
