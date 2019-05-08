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

// POST create meetup event
export const postCreateEvent = (data, token) => {
  return axios.post(`/api/event/`, data, tokenConfig(token));
};

// POST profile creation
export const postCreateProfile = (data, token) => {
  return axios.post('/api/user/profile', tokenConfig(token));
};

// GET all meetups
export const getMeetups = token => {
  return axios.get(`/api/event`, tokenConfig(token));
};

// GET all feed items
export const getPosts = token => {
  return axios.get('/api/feed/post', tokenConfig(token));
};

export const createPost = (post, token) => {
  return axios.post('/api/feed/post', post, tokenConfig(token));
};

export const createLike = (postId, token) => {
  return axios.post(`/api/feed/like`, { postId: postId }, tokenConfig(token));
};
