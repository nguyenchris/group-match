import * as actionTypes from './actionTypes';
import axios from 'axios';
const options = {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 0
};

// Action to get current location which then dispatches an action depending on result of gelocation acceptance or block
export const getCurrentLocation = () => {
  return dispatch => {
    const geoFail = err => {
      if (err) {
        console.log(err);
        dispatch({
          type: actionTypes.GEO_FAIL,
          error: err.message
        });
      }
    };

    const geoSuccess = position => {
      if (position) {
        console.log(position);
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
