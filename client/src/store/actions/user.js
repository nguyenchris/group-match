import * as actionTypes from './actionTypes';
import axios from 'axios';
// import { getUser } from '../../utils/api';
import { getSocket } from '../sockets';

const tokenConfig = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const profileSuccess = (aboutMe, imageUrl, type) => {
  return {
    type: actionTypes.USER_CREATE_PROFILE_SUCCESS,
    aboutMe,
    imageUrl
  };

  // if (type === 'update') {
  //   return {
  //     type: actionTypes.USER_UPDATE_PROFILE_SUCCESS
  //   };
  // }
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
          console.log(response);
          const { aboutMe, imageUrl } = response.data;
          dispatch(profileSuccess(aboutMe, imageUrl, type));
        })
        .catch(err => {
          console.log(err);
          dispatch(profileFail('An error occurred creating your profile!'));
        });
    }
    // if (type === 'update') {
    //   axios.put('/api/user/profile', data, tokenConfig(token)).then(response => {
    //     const { aboutMe, imageUrl } = response.data;
    //   });
    // }
  };
};

// export const messageToServer = message => {
//   return {
//     type: actionTypes.NEW_MESSAGE,
//     message: message
//   };
// };
