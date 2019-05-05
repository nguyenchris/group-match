function socketMain(io, socket) {
  socket.on('messageToServer', data => {
    console.log(data);
  });
}

module.exports = socketMain;
