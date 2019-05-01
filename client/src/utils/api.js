import axios from 'axios';

// Configures the authorization header object when passed in the token
const tokenConfig = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// GET user data at /api/user/:id
export const getUser = (userId, token) => axios.get(`/api/user/${userId}`, tokenConfig(token));

// GET google key at /api/google/key
export const getGoogleKey = token => axios.get('/api/google/key', tokenConfig(token));

// GET location arrays for autocompletion depending on user input
export const getLocations = (value, token) => {
  return axios.get(`/api/event/location?location=${encodeURI(value)}`, tokenConfig(token));
};

// GET eventbrite data based on search
export const getEventSearch = (value, token) => {
  return axios.get(`/api/event/search?${encodeURI(value)}`, tokenConfig(token));
};

// GET current location weather with timezone
export const getCurrentWeather = (lat, long, token) => {
  return axios.get(`/api/weather/current?latitude=${lat}&longitude=${long}`, tokenConfig(token));
};

export const postCreateEvent = (data, token) => {
  return axios.post(`/api/event/`, data, tokenConfig(token));
};

export const postCreateProfile = (data, token) => {
  return axios.post('/api/user/profile', tokenConfig(token));
};

export const getMeetups = token => {
  return axios.get(`/api/event`);
};
