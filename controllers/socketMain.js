const db = require('../models/index');
let dbUserId;

function socketMain(io, socket) {
  IOevents(io, 'numTotalOnline');
  socket.on('activeUser', async ({ userId, socketId, method }) => {
    dbUserId = userId;
    console.log(`dbUserId: ${dbUserId} socketID: ${socket.id} connected!`);
    // update status online to true
    db.User.updateStatus(userId, true)
      .then(user => {
        return db.User.find({ status: true }).then(users => {
          IOevents(io, 'allOnlineUsers', users);
        });
      })
      .catch(err => {
        if (err) console.log(new Error(err));
      });
  });
  socket.on('disconnect', reason => {
    if (socket.disconnected) {
      IOevents(io, 'numTotalOnline');
      console.log(`dbUserId: ${dbUserId} socketID: ${socket.id} disconnected!`);
      db.User.updateStatus(dbUserId, false)
        .then(user => {
          return db.User.find({ status: true }).then(users => {
            IOevents(io, 'allOnlineUsers', users);
          });
        })
        .catch(err => console.log(new Error(err)));
    }
  });
}

function IOevents(io, event, data) {
  switch (event) {
    // send to client number of users online
    case 'numTotalOnline':
      return io.clients((error, clients) => {
        io.emit('numTotalOnline', clients.length);
      });
    case 'allOnlineUsers':
      return io.emit(event, data);
    default:
      return;
  }
}

module.exports = socketMain;
