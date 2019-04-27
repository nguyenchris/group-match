import * as actionTypes from '../actions/actionTypes';

const intialState = {
  error: null,
  longitude: null,
  latitude: null,
  loading: false
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.GEO_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GEO_SUCCESS:
      return {
        ...state,
        longitude: action.longitude,
        latitude: action.latitude,
        loading: false
      };
    case actionTypes.GEO_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
