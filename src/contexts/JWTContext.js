import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';
import CryptoJS from 'react-native-crypto-js';

// reducer - state management
import { LOGIN, LOGIN_ERROR, LOGOUT, RESET_PASSWORD, UPDATE_PASSWORD } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import { REACT_APP_JWT_SECRET_KEY } from 'config';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  // error: ''
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  console.log(serviceToken)
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Token ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          /*   const response = await axios.get('/api/account/me');
             const { user } = response.data;
             dispatch({
               type: LOGIN,
               payload: {
                 isLoggedIn: true,
                 user
               }
             });*/
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);



  const login = async (email, pwd) => {

    dispatch({ type: LOGOUT })
    const password = CryptoJS.AES.encrypt(pwd, REACT_APP_JWT_SECRET_KEY).toString();

    const response = await axios.post(BASE_URL + API_URL.Login, { email, password });
    const { success, results, errors } = response.data[0];

    if (success == 1) {
      setSession(results[0].token);
      const user = results[0]
      setSession(user.token)
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: user
        }
      });
    } else {
      let error_msg

      switch (errors[0].error_code) {
        case "LO001":
          error_msg = "user-not-found"
          break;
        case "LO003":
          error_msg = "password-incorect"
          break;
        default:
          error_msg = "password-incorect"
          break;
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          isLoggedIn: false,
          error_msg: error_msg
        }
      });
    }
  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const initResetPassword = () => {
    dispatch({
      type: RESET_PASSWORD,
      payload: {
        status: REQUEST_STATUS.idle,
        error: ''
      }
    })
  };

  const resetPassword = async (email, phone) => {
    dispatch({type: RESET_PASSWORD, payload: {status: REQUEST_STATUS.loading}})
    const response = await axios.post(BASE_URL + API_URL.ResetPassword, { email, phone });
    const { success, errors } = response.data[0];
    if (success) {
      dispatch(
        {
          type: RESET_PASSWORD,
          payload: {
            error: '',
            status: REQUEST_STATUS.succeed
          }
        });
    } else {
      let error_msg
      switch (errors[0].error_code) {
        case "LO007":
          error_msg = "user-not-found"
          break;
        default:
          error_msg = "error-network"
          break;
      }
      dispatch({type: RESET_PASSWORD,payload: {error: error_msg, status: REQUEST_STATUS.error}});
    }
  };


  const initUpdatePassword = () => {
    dispatch({
      type: UPDATE_PASSWORD,
      payload: {
        status: REQUEST_STATUS.idle,
        error: ''
      }
    })
  };

  const updatePassword = async (old, newPwd) => {

    dispatch({ type: UPDATE_PASSWORD, payload: { status: REQUEST_STATUS.loading } })
    const old_password = CryptoJS.AES.encrypt(old, REACT_APP_JWT_SECRET_KEY).toString();
    const new_password = CryptoJS.AES.encrypt(newPwd, REACT_APP_JWT_SECRET_KEY).toString();

    const response = await axios.post(BASE_URL + API_URL.UpdatePassword, { old_password, new_password });
    const { success, errors } = response.data[0];
    if (success) {
      dispatch({ type: UPDATE_PASSWORD, payload: { status: REQUEST_STATUS.succeed, error: '' } })
    } else {
      switch (errors[0].error_code) {
        case "LO004":
          dispatch({ type: UPDATE_PASSWORD, payload: { status: REQUEST_STATUS.error, error: "old-password-incorrect" } })
          break;
        default:
          dispatch({ type: UPDATE_PASSWORD, payload: { status: REQUEST_STATUS.error, error: "password-update-error" } })
          break;
      }
    }
  };


  const updateProfile = () => { };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{
    ...state, login, logout, initUpdatePassword,initResetPassword,
    register, resetPassword, updateProfile, updatePassword
  }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
