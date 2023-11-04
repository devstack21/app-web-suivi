// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import chat from './chat';
import calendar from './calendar';
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import cartReducer from './cart';
import kanban from './kanban';
import roleReducer from './Roles/roleReducer';
import accountsReducer from './Accounts/accountsReducer';
import checkpointsReducer from './checkpoints/checkpointsReducer';
import betailReducer from './Betail/betailReducer';

import tendanceVilleReducer from './minepia/dashboard/tendanceVilleReducer';
import listeTypeBetailReducer from './minepia/listeTypeBetailReducer';
import statTypeBetailReducer from './minepia/dashboard/statTypeBetailReducer';
import listRegionReducer from './minepia/dashboard/listRegionReducer';
import listDashboardReducer from './minepia/dashboard/listDashboardReducer';
import statCheckpointReducer from './minepia/dashboard/statCheckpointReducer';
import listeDesCamionsReducer from './minepia/itineraire/listeDesCamionsReducer';
import listeItineraireReducer from './minepia/itineraire/listeItineraireReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'mantis-js-'
    },
    cartReducer
  ),
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
  product: productReducer,
  kanban,



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

});

export default reducers;
