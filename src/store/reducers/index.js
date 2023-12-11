// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import snackbar from './snackbar';
import roleReducer from './roles/roleReducer';
import accountsReducer from './accounts/accountsReducer';
import alertReducer from './alerte/alertReducer';
import checkpointsReducer from './checkpoints/checkpointsReducer';
import betailReducer from './betail/betailReducer';

import statCheckpointReducer from './dashboard/statCheckpointSlice';
import dashboardReducer from './dashboard/dashboardReducer';
import locationReducer from './location/locationReducer';

import detailRapportReducer from './rapports/detailRapportReducer';
import activerRapportReducer from './rapports/activerRapportReducer';
import rejeterRapportReducer from './rapports/rejeterRapportReducer';
import rapportdReducer from './rapports/rapportReducer';
import rapportPdfReducer from './rapports/rapportPdfSlice';
import transportReducer from './itineraire/transportReducer';
import validatePasswordReducer from './validatePassword/validatePasswordReducer';
import axeparcoursReducer from './axeparcours/axeparcoursReducer';
import visitorReducer from './visitor/visitorReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
 
  account: persistReducer(
    {
      key: 'accounts',
      storage
    },
    accountsReducer
  ),
  
  betail: persistReducer(
    {
      key: 'betail',
      storage
    },
    betailReducer
  ),
  checkpoint: persistReducer(
    {
      key: 'checkpoint',
      storage
    },
    checkpointsReducer
  ),
  dashboard: persistReducer(
    {
      key: 'dashboard',
      storage
    },
    dashboardReducer
  ),
  visitor: persistReducer(
    {
      key: 'visitor',
      storage
    },
    visitorReducer
  ),
  location: persistReducer(
    {
      key: 'location',
      storage
    },
    locationReducer
  ),
  role: persistReducer(
    {
      key: 'role',
      storage
    },
    roleReducer
  ),
  alert: persistReducer(
    {
      key: 'alert',
      storage
    },
    alertReducer
  ),
  rapport: persistReducer(
    {
      key: 'alert',
      storage
    },
    rapportdReducer
  ),
  transport: persistReducer(
    {
      key: 'transport',
      storage
    },
    transportReducer
  ),
 


 



  
  statCheckpoint: persistReducer(
    {
      key: 'statCheckpoint',
      storage
    },
    statCheckpointReducer
  ),



  
  
  detailRapport: persistReducer(
    {
      key: 'detailRapport',
      storage
    },
    detailRapportReducer
  ),
  activerRapport: persistReducer(
    {
      key: 'activerRapport',
      storage
    },
    activerRapportReducer
  ),
  rejeterRapport: persistReducer(
    {
      key: 'rejeterRapport',
      storage
    },
    rejeterRapportReducer
  ),

  rapportPdf: persistReducer(
    {
      key: 'rapportPdf',
      storage
    },
    rapportPdfReducer
  ),

  validatePassword: persistReducer(
    {
      key: 'validatePassword',
      storage
    },
    validatePasswordReducer),
  axeparcours: persistReducer(
    {
      key: 'axeparcours',
      storage
    },
    axeparcoursReducer
  ),

});

export default reducers;
