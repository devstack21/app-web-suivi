// rootReducer.js
import { combineReducers } from 'redux';
import analyticsSlice from './analyticsSlice';
import statTypeBetailSlice from './statApproTypeBetailSlice';
// Import other reducers...

const dashboardReducer = combineReducers({
    analytics: analyticsSlice,
    supply: statTypeBetailSlice

});

export default dashboardReducer;
