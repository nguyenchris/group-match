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
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckTimeout = expiration => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiration);
  };
};

export const auth = (data, isLogin) => {
  return dispatch => {
    dispatch(authStart());
    // if (isLogin) {
    axios
      .post('/api/user/signup', data)
      .then(response => {
        console.log(response.data);
        const expiration = new Date(new Date().getTime() + 3600000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiration', expiration.toISOString());
        localStorage.setItem('userId', response.data.userId);
        dispatch(authSuccess(response.data.token, response.data.userId));
        dispatch(authCheckTimeout(3600000));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.message));
      });
    // }
  };
};
