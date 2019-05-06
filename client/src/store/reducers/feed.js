import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
  numberOnline: null,
  posts: [],
  error: null
};

const getNumberOnline = (state, action) => {
  return updateObject(state, {
    numberOnline: action.numberOnline
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ONLINE_USERS:
      return getNumberOnline(state, action);
    default:
      return state;
  }
};

export default reducer;
