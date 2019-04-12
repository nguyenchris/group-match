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

export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL
  };
};

// export const authLogout = ()

export const auth = (data, isLogin) => {
  return dispatch => {
    dispatch(authStart());
    if (isLogin) {
      axios.post('/api/user/signup', data).then(response => {
        console.log(response.data);
      }).catch((err) => {
        console.log(err.response)
      })

    }
  };
};
