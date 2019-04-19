import axios from 'axios';

// Configures the authorization header object when passed in the token
const tokenConfig = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// GET user data at /api/user/:id
export const getUser = (userId, token) => axios.get(`/api/user/${userId}`, tokenConfig(token));

// GET google key at /api/google/key
export const getGoogleKey = token => axios.get('/api/google/key', tokenConfig(token));

// GET location arrays for autocompletion
export const getLocations = (value, token) => {
  axios.get(`/api/event/search?location=${encodeURI(value)}`, tokenConfig(token));
};
