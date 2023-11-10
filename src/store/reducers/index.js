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
import listeDesCamionsReducer from './itineraire/listeDesCamionsReducer';
import listeItineraireReducer from './itineraire/listeItineraireReducer';
import dashboardReducer from './dashboard/dashboardReducer';
import locationReducer from './location/locationReducer';

import detailRapportReducer from './rapports/detailRapportReducer';
import activerRapportReducer from './rapports/activerRapportReducer';
import rejeterRapportReducer from './rapports/rejeterRapportReducer';
import rapportdReducer from './rapports/rapportReducer';
import rapportPdfReducer from './rapports/rapportPdfSlice';

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
 


 



  
  statCheckpoint: persistReducer(
    {
      key: 'statCheckpoint',
      storage
    },
    statCheckpointReducer
  ),

  listeCamion: persistReducer(
    {
      key: 'listeCamion',
      storage
    },
    listeDesCamionsReducer
  ),
  listeCamionItineraire: persistReducer(
    {
      key: 'listeCamionItineraire',
      storage
    },
    listeItineraireReducer
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

});

export default reducers;
