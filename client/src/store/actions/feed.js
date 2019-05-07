import * as actionTypes from './actionTypes';

export const getOnlineUsers = (number, users) => {
  return {
    type: actionTypes.GET_ONLINE_USERS,
    numberOnline: number,
    usersOnline: users
  };
};
