// rootReducer.js
import { combineReducers } from 'redux';
import listeRapportReducer from './listeRapportSlice';
// Import other reducers...

const rapportdReducer = combineReducers({
    listRapport: listeRapportReducer,
});

export default rapportdReducer;
