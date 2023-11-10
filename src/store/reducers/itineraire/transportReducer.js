// rootReducer.js
import { combineReducers } from 'redux';
import transportListSlice from './transportListSlice';
import transportDetailSlice from './transportDetailSlice';
// Import other reducers...

const transportReducer = combineReducers({
    list: transportListSlice,
    detail: transportDetailSlice
});

export default transportReducer;
