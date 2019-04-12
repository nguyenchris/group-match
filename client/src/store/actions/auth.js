import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

// export const authLogout = ()

export const auth = (data, isLogin) => {
  return dispatch => {
    dispatch(authStart());
    // if (isLogin) {
      console.log(data)
      axios.post('/api/user/signup', data).then(response => {
        console.log(response.data)
      }).catch((err) => {
        dispatch(authFail(err.response.data.message))
      })
    // }
  };
};
