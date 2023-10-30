// rootReducer.js
import { combineReducers } from 'redux';
import listReducer from './listSlice';
import moduleList from './moduleList';
import createSlice from './createSlice';
import editSlice from './editSlice';
import detailSlice from './detailSlice';
// Import other reducers...

const roleReducer = combineReducers({
  create: createSlice,
  list: listReducer,
  module: moduleList,
  edit: editSlice,
  detail: detailSlice
  // Add other slices here...
});

export default roleReducer;
