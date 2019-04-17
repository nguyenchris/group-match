import axios from 'axios';

// Configures the authorization header object when passed in the token
const tokenConfig = token => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Get user data at /api/user/:id
export const getUser = (userId, token) => axios.get(`/api/user/${userId}`, tokenConfig(token));

// Get google key at /api/google/key
export const getGoogleKey = token => axios.get('/api/google/key', tokenConfig(token));
