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
import dashboardReducer from './dashboard/dashboardSlice';
import locationReducer from './location/locationReducer';

import listeRapportReducer from './minepia/rapports/listeRapportReducer';
import detailRapportReducer from './minepia/rapports/detailRapportReducer';
import activerRapportReducer from './minepia/rapports/activerRapportReducer';
import rejeterRapportReducer from './minepia/rapports/rejeterRapportReducer';
import rapportPdfReducer from './minepia/rapports/rapportPdfReducer';

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

  
  listeRapport: persistReducer(
    {
      key: 'listeRapport',
      storage
    },
    listeRapportReducer
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
