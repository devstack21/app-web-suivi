// rootReducer.js
import { combineReducers } from 'redux';
import statApproTypeBetailSlice from './statApproTypeBetailSlice';
import indicateurVilleSlice from './statIndicateurVilleSlice';
import statTypeBetailSlice from './statTypeBetailSlice';
import loginVisitorReducer from './loginVisitorSlice';

const visitorReducer = combineReducers({
    login: loginVisitorReducer,
    indicator: indicateurVilleSlice,
    supply: statApproTypeBetailSlice,
    type: statTypeBetailSlice
});

export default visitorReducer;
