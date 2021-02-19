const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
    console.log(socket.id);
  });

  socket.on('username submitted', (uname) => {
    console.log('user ' + uname + ' wants to create a game');  
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
