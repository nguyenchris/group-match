import axios from 'axios';

export const signup = () => axios.post('/api/user/signup');

export const getGoogleKey = () => axios.get('/api/google/key');
