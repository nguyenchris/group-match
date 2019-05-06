import * as actionTypes from './actionTypes';

export const getOnlineUsers = number => {
  return {
    type: actionTypes.GET_ONLINE_USERS,
    numberOnline: number
  };
};
