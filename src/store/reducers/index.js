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

  
});

export default reducers;
