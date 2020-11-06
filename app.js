const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', (socket) => {
  socket.on('join', (roomId) => {
    const userId = socket.id;

    if (!users[roomId]) {
      users[roomId] = [];
    }

    users[roomId].push(userId);

    console.log(`User ${userId} joined at ${roomId}`);

    socketToRoom[userId] = roomId;

    const others = users[roomId].filter((id) => id !== userId);

    socket.join(roomId);

    console.log('users', others)

    socket.emit('users', others);

    socket.to(roomId).broadcast.emit('joined', userId);
  });

  socket.on('disconnect', () => {

    console.log(socket.id, 'has disconnected')

    const roomId = socketToRoom[socket.id];

    if (users[roomId]) {
      users[roomId] = users[roomId].filter(id => socket.id !== id);
    }

    if (socketToRoom[socket.id]) {
      delete socketToRoom[socket.id];
    }

    socket.to(roomId).broadcast.emit('left', socket.id);
  });

  socket.on('leave', (roomId) => {

    console.log(socket.id, 'has left')

    if (!users[roomId]) {
      users[roomId] = [];
    }

    users[roomId] = users[roomId].filter(id => socket.id !== id);

    delete socketToRoom[socket.id];

    socket.to(roomId).broadcast.emit('left', socket.id);
  });
});

server.listen(process.env.PORT || 4000, () =>
  console.log('server is running on port 4000')
);
