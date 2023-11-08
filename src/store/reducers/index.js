// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import snackbar from './snackbar';
import roleReducer from './Roles/roleReducer';
import accountsReducer from './Accounts/accountsReducer';
import checkpointsReducer from './checkpoints/checkpointsReducer';
import betailReducer from './Betail/betailReducer';

import tendanceVilleReducer from './dashboard/tendanceVilleReducer';
import statCheckpointReducer from './dashboard/statCheckpointReducer';
import listeDesCamionsReducer from './itineraire/listeDesCamionsReducer';
import listeItineraireReducer from './itineraire/listeItineraireReducer';
import listVilleReducer from './Location/villeSlice';
import listeContactReducer from './alerte/listeContactReducer';
import listeAlerteReducer from './alerte/listeAlerteReducer';
import dashboardReducer from './dashboard/dashboardReducer';
import locationReducer from './Location/locationReducer';

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

  listeVille: persistReducer(
    {
      key: 'listeVille',
      storage
    },
    listVilleReducer
  ),
  listeContact: persistReducer(
    {
      key: 'listeContact',
      storage
    },
    listeContactReducer
  ),
  listeAlerte: persistReducer(
    {
      key: 'listeAlerte',
      storage
    },
    listeAlerteReducer
  ),

});

export default reducers;
