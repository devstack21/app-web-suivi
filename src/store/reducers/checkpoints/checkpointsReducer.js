// rootReducer.js
import { combineReducers } from 'redux';
import listReducer from './listSlice';
import createSlice from './createSlice';
import editSlice from './editSlice';
import districtsSlice from './districtsSlice';
import detailSlice from './detailSlice';
import listAgentSlice from './listAgentSlice';
// Import other reducers...

const checkpointsReducer = combineReducers({
  agentList: listAgentSlice,
  create: createSlice,
  detail: detailSlice,
  disctricts: districtsSlice,
  edit: editSlice,
  list: listReducer,
});

export default checkpointsReducer;
