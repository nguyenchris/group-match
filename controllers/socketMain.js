function socketMain(io, socket) {
  IOevents(io, 'numTotalOnline');
  socket.on('disconnect', reason => {
    if (socket.disconnected) {
      IOevents(io, 'numTotalOnline');
      console.log(socket.id + ' disconnected');
    }
  });
}

function IOevents(io, event) {
  switch (event) {
    // send to client number of users online
    case 'numTotalOnline':
      return io.clients((error, clients) => {
        io.emit('numTotalOnline', clients.length);
      });
    default:
      return;
  }
}

module.exports = socketMain;
