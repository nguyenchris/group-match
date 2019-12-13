import { store } from '../index';
import io from 'socket.io-client';
import { getOnlineUsers } from './actions/index';

export let socket;

// function to connect socket with server after user signs in
export const getSocket = userId => {
  if (!socket) {
    socket = io.connect();
    socket.on('connect', () => {
      socket.emit('activeUser', { userId: userId, socketId: socket.id, method: 'connect' });
    });
    socket.on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    });
    // Get array of all users online
    socket.on('allOnlineUsers', users => {
      store.dispatch(getOnlineUsers(users.length, users));
    });
  }
  return socket;
};
