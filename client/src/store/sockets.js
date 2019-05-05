import { store } from '../index';
import io from 'socket.io-client';
import { messageToServer } from './actions/user';

let socket;

// function to connect socket with server after user signs in
export const getSocket = () => {
  if (!socket) {
    console.log('socket');
    socket = io.connect();
    socket.on('connect', () => {
      console.log(socket);
    });
    socket.on('messageToServer', message => {
      store.dispatch(messageToServer(message));
    });
  }
  return socket;
};
