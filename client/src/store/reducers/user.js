import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
  token: null,
  userId: null,
  name: null,
  isProfileCreated: null,
  imageUrl: null,
  createdOn: null,
  lastSignIn: null,
  friends: [],
  status: false,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

// Authform has submitted, trigger loading spinner
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
// Update state to reflect successful authentication
const authSuccess = (state, action) => {
  const { userId, name, status, isProfileCreated, lastSignIn, createdOn, token, imageUrl } = action;
  return updateObject(state, {
    token: token,
    userId: userId,
    name: name,
    lastSignIn: lastSignIn,
    imageUrl: imageUrl,
    status: status,
    isProfileCreated: isProfileCreated,
    createdOn: createdOn,
    profileError: null,
    error: null,
    loading: false
  });
};
// Update state with error message returned from server
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    name: null,
    isProfileCreated: null,
    imageUrl: null,
    lastSignIn: null,
    friends: [],
    status: false,
    createdOn: null
  });
};

const profileSuccess = (state, action) => {
  return updateObject(state, {
    aboutMe: action.aboutMe,
    imageUrl: action.imageUrl,
    isProfileCreated: true,
    error: null
  });
};

const profileFail = (state, action) => {
  return updateObject(state, {
    error: action.message
  });
};

const newMessage = action => {
  console.log(action.message);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.USER_CREATE_PROFILE_SUCCESS:
      return profileSuccess(state, action);
    case actionTypes.USER_CREATE_PROFILE_FAIL:
      return profileFail(state, action);
    case actionTypes.NEW_MESSAGE:
      return newMessage(action);
    default:
      return state;
  }
};

export default reducer;
