// action - state management
import { REQUEST_STATUS } from 'utils/apiConfig';
import {  REGISTER, LOGIN, LOGOUT, 
          RESET_PASSWORD,  UPDATE_PASSWORD } from './authActions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  error: '',
  loginStatus: REQUEST_STATUS.idle,

  resetStatus: REQUEST_STATUS.idle,
  resetError: '',

  updateStatus: REQUEST_STATUS.idle,
  updateError: ''
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }

    case LOGIN: {
      const { user, error, status, isLoggedIn } = action.payload;
      return {
        ...state,
        isLoggedIn: isLoggedIn,
        isInitialized: true,
        user,
        loginStatus: status,
        error: error
      };
    }

    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        error: '',
        loginStatus: 'idle'
      };
    }

    
    case RESET_PASSWORD: {
      const { status, error } = action.payload
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        resetError: error,
        resetStatus: status
      };
    }
  

    case UPDATE_PASSWORD: {
      const { status, error } = action.payload
      return {
        ...state,
        updateStatus: status,
        updateError: error,
        isLoggedIn: true,
        isInitialized: true,
      };
    }

    default: {
      return { ...state };
    }
  }
};


export default auth;
