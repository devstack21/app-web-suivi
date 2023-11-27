// rootReducer.js
import { combineReducers } from 'redux';
import createSlice from './createSlice';
import listSlice from './listSlice';
import moduleList from './moduleList';
import editSlice from './editSlice';
import detailSlice from './detailSlice';
// Import other reducers...

const roleReducer = combineReducers({
  create: createSlice,
  list: listSlice,
  module: moduleList,
  edit: editSlice,
  detail: detailSlice
  // Add other slices
});

export default roleReducer;
