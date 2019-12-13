import * as actionTypes from './actionTypes';
import axios from 'axios';


const tokenConfig = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const profileSuccess = (aboutMe, imageUrl, type) => {
  return {
    type: actionTypes.USER_CREATE_PROFILE_SUCCESS,
    aboutMe,
    imageUrl
  };
};

export const profileFail = message => {
  return {
    type: actionTypes.USER_CREATE_PROFILE_FAIL,
    message
  };
};

export const createProfile = (token, data, type) => {
  return dispatch => {
    if (type === 'create') {
      axios
        .post('/api/user/profile', data, tokenConfig(token))
        .then(response => {
          const { aboutMe, imageUrl } = response.data;
          dispatch(profileSuccess(aboutMe, imageUrl, type));
        })
        .catch(err => {
          dispatch(profileFail('An error occurred creating your profile!'));
        });
    }
  };
};
