// rootReducer.js
import { combineReducers } from 'redux';
import listeRapportReducer from './listeRapportSlice';
import rapportPdfReducer from './rapportPdfSlice';
// Import other reducers...

const rapportdReducer = combineReducers({
    listRapport: listeRapportReducer,
    pdf: rapportPdfReducer
});

export default rapportdReducer;
