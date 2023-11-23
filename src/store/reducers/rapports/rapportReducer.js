// rootReducer.js
import { combineReducers } from 'redux';
import listeRapportReducer from './listeRapportSlice';
import rapportPdfReducer from './rapportPdfSlice';
import listeRapportCheckpoint from './listeRapportCheckpoint';
// Import other reducers...

const rapportdReducer = combineReducers({
    listRapport: listeRapportReducer,
    pdf: rapportPdfReducer,
    checkpoint: listeRapportCheckpoint
});

export default rapportdReducer;
