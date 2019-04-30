// import * as actionTypes from './actionTypes';
// import axios from 'axios';
// import { getUser } from '../../utils';

// export const userGetStart = () => {
//   return {
//     type: actionTypes.USER_GET_START
//   };
// };

// export const userGetSuccess = (token, userId) => {
//   return {
//     type: actionTypes.USER_GET_SUCCESS,
//     token: token,
//     userId: userId
//   };
// };

// export const userGetFail = error => {
//   return {
//     type: actionTypes.USER_GET_FAIL,
//     error: error
//   };
// };

// // Return dispatches for auth flow and user signup / login
// export const getUser = (data, isLogin) => {
//   return dispatch => {
//     dispatch(userGetStart());
//     getUser()
//   };
// };

// // Checks if token exists in localstorage and returns the dispatch
// export const authCheckState = () => {
//   return dispatch => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       dispatch(logout());
//     } else {
//       const expiration = new Date(localStorage.getItem('expiration'));
//       if (expiration <= new Date()) {
//         dispatch(logout());
//       } else {
//         const userId = localStorage.getItem('userId');
//         dispatch(authSuccess(token, userId));
//         dispatch(authCheckTimeout(expiration.getTime() - new Date().getTime()));
//       }
//     }
//   };
// };
