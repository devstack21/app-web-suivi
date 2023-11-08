// rootReducer.js
import { combineReducers } from 'redux';
import analyticsSlice from './analyticsSlice';
import statImportTypeBetailSlice from './statImportTypeBetailSlice';
import statApproTypeBetailSlice from './statApproTypeBetailSlice';
// Import other reducers...

const dashboardReducer = combineReducers({
    analytics: analyticsSlice,
    import:statImportTypeBetailSlice,
    supply: statApproTypeBetailSlice

});

export default dashboardReducer;
