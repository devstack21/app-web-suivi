// rootReducer.js
import { combineReducers } from 'redux';
import listeAlerteSlice from './listeAlerteSlice';
import editAlerteSlice from './editAlerteSlice';
import deleteAlerteSlice from './deleteAlerteSlice';
import listeContactSlice from './listeContactSlice';
// Import other reducers...

const alertReducer = combineReducers({
  list: listeAlerteSlice,
  edit: editAlerteSlice,
  delete: deleteAlerteSlice,
  contact: listeContactSlice
});

export default alertReducer;
