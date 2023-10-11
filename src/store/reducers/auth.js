// action - state management
import { REQUEST_STATUS } from 'utils/apiConfig';
import {  REGISTER, LOGIN, LOGOUT, LOGIN_ERROR, 
          RESET_PASSWORD, RESET_PASSWORD_ERROR, INIT_RESET_PASSWORD } from './actions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  error: '',
  isReset: 'false',
  resetStatus: REQUEST_STATUS.idle,
  resetError: ''
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
    case INIT_RESET_PASSWORD: {
      return {
        ...state,
        user: null,
        error: '',
        isReset: false,
        resetError: '',
        resetStatus: REQUEST_STATUS.idle
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        error: '',
        isReset: true,
        resetError: '',
        resetStatus: REQUEST_STATUS.succeed
      };
    }
    case RESET_PASSWORD_ERROR: {
      const {error} = action.payload
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        isReset: false,
        resetError: error,
        resetStatus: REQUEST_STATUS.error

      };
    }
    default: {
      return { ...state };
    }
  }
};


export default auth;
