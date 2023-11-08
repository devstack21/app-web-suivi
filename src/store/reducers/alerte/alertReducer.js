// rootReducer.js
import { combineReducers } from 'redux';
import listeAlerteSlice from './listeAlerteSlice';
import editAlerteSlice from './editAlerteSlice';
import deleteAlerteSlice from './deleteAlerteSlice';
import listeContactSlice from './listeContactSlice';
import createAlerteSlice from './createAlerteSlice';
// Import other reducers...

const alertReducer = combineReducers({
  list: listeAlerteSlice,
  create: createAlerteSlice,
  edit: editAlerteSlice,
  delete: deleteAlerteSlice,
  contact: listeContactSlice
});

export default alertReducer;
