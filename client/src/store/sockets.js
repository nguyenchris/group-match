import { store } from '../index';
import io from 'socket.io-client';
import { getOnlineUsers } from './actions/index';

export let socket;

// function to connect socket with server after user signs in
export const getSocket = () => {
  if (!socket) {
    socket = io.connect();
    socket.on('connect', () => {
      console.log('socket connected!');
    });
    socket.on('numTotalOnline', numUsers => {
      store.dispatch(getOnlineUsers(numUsers));
    });
    socket.on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    });
    // socket.on('posts', message => {
    //   store.dispatch(messageToServer(message));
    // });
  }
  return socket;
};
