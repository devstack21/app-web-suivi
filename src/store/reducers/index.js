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
import listeTypeBetailReducer from './minepia/listeTypeBetailReducer';
import statTypeBetailReducer from './dashboard/statTypeBetailReducer';
import listRegionReducer from './dashboard/listRegionReducer';
import listDashboardReducer from './dashboard/listDashboardReducer';
import statCheckpointReducer from './dashboard/statCheckpointReducer';
import listeDesCamionsReducer from './itineraire/listeDesCamionsReducer';
import listeItineraireReducer from './itineraire/listeItineraireReducer';
import listVilleReducer from './dashboard/listVilleReducer';
import listeContactReducer from './alerte/listeContactReducer';
import listeAlerteReducer from './alerte/listeAlerteReducer';

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
  listeTypeBetail: persistReducer(
    {
      key: 'listeTypeBetail',
      storage
    },
    listeTypeBetailReducer
  ),

  statTypeBetail: persistReducer(
    {
      key: 'statTypeBetail',
      storage
    },
    statTypeBetailReducer
  ),
  
  listeRegion: persistReducer(
    {
      key: 'listeRegion',
      storage
    },
    listRegionReducer
  ),
  listeHaut: persistReducer(
    {
      key: 'listeHaut',
      storage
    },
    listDashboardReducer
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
