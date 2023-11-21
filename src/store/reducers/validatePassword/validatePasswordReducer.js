// rootReducer.js
import { combineReducers } from 'redux';

import listeValidatePasswordSlice from './listeValidatePasswordSlice';
import validatePasswordSlice from './validatePasswordSlice';
// Import other reducers...

const validatePasswordReducer = combineReducers({
  list: listeValidatePasswordSlice,
  reset: validatePasswordSlice
});

export default validatePasswordReducer;
