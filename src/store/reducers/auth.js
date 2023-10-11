// action - state management
import { REQUEST_STATUS } from 'utils/apiConfig';
import {  REGISTER, LOGIN, LOGOUT, LOGIN_ERROR, 
          RESET_PASSWORD,  UPDATE_PASSWORD } from './actions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  error: '',

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
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case LOGIN_ERROR: {
      const { error_msg } = action.payload;
      return {
        ...state,
        isLoggedIn: false,
        isInitialized: true,
        error: error_msg
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        error: ''
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
