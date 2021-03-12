const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var openRooms = []; // An array of open rooms

var roomIsOpen = function (room, roomArr) {
  for (let i = 0; i < roomArr.length; i++) {
    if (roomArr[i] == room) {
      return true;
    }
  }
  return false;
}

var ID = function () { // Credit for this function to gordonbrander on Github
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('game-created', () => {
    // Create a unique room ID, join the socket, and send it back
    let room = ID();
    openRooms.push(room);
    socket.join(room);
    console.log(socket.rooms);
    io.to(room).emit('creating-room', room);
  });

  socket.on('roomID-submitted', (roomID, playerID) => {
    if (roomIsOpen(roomID, openRooms)) {
      // Join the room
      socket.join(roomID);
      io.to(roomID).emit('player2-joining');

      // Remove the room from openRooms
      for (let i = 0; i < openRooms.length; i++) {
        if (openRooms[i] == roomID) {
          openRooms.splice(i, 1);
          i = openRooms.length;
        }
      }
    } else {
      io.to(playerID).emit('room-full');
    }
  });

  socket.on('move', (moveObj, roomID) => {
    console.log(moveObj + ' in ' + roomID);
    socket.to(roomID).emit('opponent-move', moveObj, roomID);
  });

  socket.on('start-over', (roomID) => {
    socket.to(roomID).emit('start-over');
  });


  socket.on('switch', (c1, c2, fen, roomID) => {
    console.log("switching pieces " + c1 + " with " + c2);
    socket.to(roomID).emit('switch-pieces', c1, c2, fen);
  });

});

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
