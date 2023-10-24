// rootReducer.js
import { combineReducers } from 'redux';
import listReducer from './listSlice';
import createSlice from './createSlice';
import editSlice from './editSlice';
import districtsSlice from './districtsSlice';
// Import other reducers...

const checkpointsReducer = combineReducers({
  create: createSlice,
  disctricts: districtsSlice,
  edit: editSlice,
  list: listReducer,
});

export default checkpointsReducer;
