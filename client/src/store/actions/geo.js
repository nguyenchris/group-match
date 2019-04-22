import * as actionTypes from './actionTypes';

// export const geoStart = () => {
//   return {
//     type: actionTypes.GEO_START
//   };
// };

// export const geoSuccess = position => {
//   return {
//     type: actionTypes.GEO_SUCCESS,
//     latitude: position.coords.latitude,
//     longitude: position.coords.longitude
//   };
// };

// export const geoFail = () => {
//   return {
//     type: actionTypes.GEO_FAIL
//   };
// };

export const getCurrentLocation = () => {
  return dispatch => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    const geoFail = err => {
      if (err) {
        console.log(err);
        // dispatch({
        //   type: actionTypes.GEO_FAIL,
        //   error: err
        // });
      }
    };

    const geoSuccess = position => {
      if (position) {
        console.log(position);
        // dispatch({
        //   type: actionTypes.GEO_SUCCESS,
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude
        // });
      }
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, options);
  };
};
