// rootReducer.js
import { combineReducers } from 'redux';
import listeAxeparcoursSlice from './listeAxeparcoursSlice';
import createAxeparcoursSlice from './createAxeparcoursSlice';
import editAxeparcoursSlice from './editAxeparcoursSlice';
import detailAxeparcoursSlice from './detailAxeparcoursSlice';


const axeparcoursReducer = combineReducers({

    list: listeAxeparcoursSlice,
    create: createAxeparcoursSlice,
    edit: editAxeparcoursSlice,
    detail: detailAxeparcoursSlice
  
});

export default axeparcoursReducer;
