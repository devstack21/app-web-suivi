// rootReducer.js
import { combineReducers } from 'redux';
import listReducer from './listSlice';
import createSlice from './createSlice';
import editSlice from './editSlice';
// Import other reducers...

const checkpointsReducer = combineReducers({
  create: createSlice,
  edit: editSlice,
  list: listReducer
});

export default checkpointsReducer;
