// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import snackbar from './snackbar';
import roleReducer from './Roles/roleReducer';
import accountsReducer from './Accounts/accountsReducer';
import alertReducer from './alerte/alertReducer';
import checkpointsReducer from './checkpoints/checkpointsReducer';
import betailReducer from './Betail/betailReducer';

import tendanceVilleReducer from './dashboard/tendanceVilleReducer';
import statCheckpointReducer from './dashboard/statCheckpointReducer';
import listeDesCamionsReducer from './itineraire/listeDesCamionsReducer';
import listeItineraireReducer from './itineraire/listeItineraireReducer';
import dashboardReducer from './dashboard/dashboardReducer';
import locationReducer from './Location/locationReducer';

import listeRapportReducer from './minepia/rapports/listeRapportReducer';
import detailRapportReducer from './minepia/rapports/detailRapportReducer';
import activerRapportReducer from './minepia/rapports/activerRapportReducer';
import rejeterRapportReducer from './minepia/rapports/rejeterRapportReducer';

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
  dashbaord: persistReducer(
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
 


  tendanceVille: persistReducer(
    {
      key: 'tendanceVille',
      storage
    },
    tendanceVilleReducer
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

});

export default reducers;
