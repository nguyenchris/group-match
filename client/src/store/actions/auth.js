import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS
  }
}

export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL
  }
}

// export const authLogout = ()

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart(email, password))
  }
}