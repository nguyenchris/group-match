import * as actionTypes from './actionTypes';
const options = {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 0
};

const loadGeoLocation = () => {
  return {
    type: actionTypes.GEO_START
  };
};

// Action to get current location which then dispatches an action depending on result of gelocation acceptance or block
export const getCurrentLocation = () => {
  return dispatch => {
    dispatch(loadGeoLocation());
    const geoFail = err => {
      if (err) {
        dispatch({
          type: actionTypes.GEO_FAIL,
          error: err.message
        });
      }
    };

    const geoSuccess = position => {
      if (position) {
        dispatch({
          type: actionTypes.GEO_SUCCESS,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, options);
  };
};
