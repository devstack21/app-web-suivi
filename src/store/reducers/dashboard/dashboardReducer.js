// rootReducer.js
import { combineReducers } from 'redux';
import analyticsSlice from './analyticsSlice';
import statImportTypeBetailSlice from './statImportTypeBetailSlice';
import statApproTypeBetailSlice from './statApproTypeBetailSlice';
import indicateurVilleSlice from './statIndicateurVilleSlice';
import statTypeBetailSlice from './statTypeBetailSlice';
// Import other reducers...

const dashboardReducer = combineReducers({
    analytics: analyticsSlice,
    import:statImportTypeBetailSlice,
    indicator: indicateurVilleSlice,
    supply: statApproTypeBetailSlice,
    type: statTypeBetailSlice
});

export default dashboardReducer;
