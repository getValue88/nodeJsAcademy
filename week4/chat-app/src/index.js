const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messeges');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//CONFIG
const port = process.env.PORT || 3000;

//static files
app.use(express.static(path.join(__dirname, '../public')));

//IO
io.on('connection', socket => {

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) {
            return callback(error);
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined`));
        callback();
    });

    socket.on('sendMessage', (msg, callback) => {
        const user = getUser(socket.id);

        if (!user) {
            return callback(undefined);
        }

        const filter = new Filter();

        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed');
        }

        io.to(user.room).emit('message', generateMessage(msg));
        callback();
    });

    socket.on('sendLocation', ({ latitude, longitude }, callback) => {
        const user = getUser(socket.id);

        if (!user) {
            return callback(undefined);
        }

        io.to(user.room).emit('locationMessage', generateLocationMessage(`http://google.com/maps?q=${latitude},${longitude}`));
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left`));
        }
    });
});

//SERVER INIT
server.listen(port, () => console.log(`App listen on port ${port}`));