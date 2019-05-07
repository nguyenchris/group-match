import { store } from '../index';
import io from 'socket.io-client';
import { getOnlineUsers } from './actions/index';

export let socket;

// function to connect socket with server after user signs in
export const getSocket = userId => {
  if (!socket) {
    socket = io.connect();
    socket.on('connect', () => {
      console.log('socket connected!');
      socket.emit('activeUser', { userId: userId, socketId: socket.id, method: 'connect' });
    });
    // socket.on('numTotalOnline', numUsers => {
    //   store.dispatch(getOnlineUsers(numUsers));
    // });
    socket.on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        socket.connect();
      }
      // socket.emit('activeUser', { userId: userId, socketId: socket.id, method: 'disconnect' });
    });
    // Get array of all users online
    socket.on('allOnlineUsers', users => {
      console.log('allOnlineUsers', users);
      store.dispatch(getOnlineUsers(users.length, users));
    });

    // socket.on('posts', ({ action, post }) => {
    //   // switch (action) {
    //   //   case 'create':
    //   //   // return dispatch()
    //   //   default:
    //   //     return;
    //   // }
    // });
  }
  return socket;
};
