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
  };
};

// export const authCheckState = () => {
//   return dispatch => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       dispatch(logout());
//     } else {
//       const expirationDate = new Date(localStorage.getItem('expirationDate'));
//       if (expirationDate <= new Date()) {
//         dispatch(logout());
//       } else {
//         const userId = localStorage.getItem('userId');
//         dispatch(authSuccess(token, userId));
//         dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
//       }
//     }
//   };
// };
