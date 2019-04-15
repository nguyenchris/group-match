import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

// Returns dispatch to logout user after token's 'expiration' in milliseconds
export const authCheckTimeout = expiration => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiration);
  };
};

// Return dispatches for auth flow and user signup / login
export const auth = (data, isLogin) => {
  return dispatch => {
    console.log(data);
    dispatch(authStart());
    let path = null;
    isLogin ? (path = 'login') : (path = 'signup');
    axios
      .post(`/api/user/${path}`, data)
      .then(response => {
        const { token, userId } = response.data;
        const expiration = new Date(new Date().getTime() + 3600000);
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration.toISOString());
        localStorage.setItem('userId', userId);
        dispatch(authSuccess(token, userId));
        dispatch(authCheckTimeout(3600000));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.message));
      });
  };
};

// Checks if token exists in localstorage and returns the dispatch
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expiration = new Date(localStorage.getItem('expiration'));
      if (expiration <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(authCheckTimeout(expiration.getTime() - new Date().getTime()));
      }
    }
  };
};
