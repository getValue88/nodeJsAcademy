const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom, getRooms } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//CONFIG
const port = process.env.PORT || 3000;

//static files
app.use(express.static(path.join(__dirname, '../public')));

//IO
io.on('connection', socket => {
    //join a room
    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) {
            return callback(error);
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined`));

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        callback();
    });

    //public message
    socket.on('sendMessage', (msg, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();

        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed');
        }

        io.to(user.room).emit('message', generateMessage(user.username, msg));
        callback();
    });

    //private message
    socket.on('privateMessage', ({ to, message }, callback) => {
        const user = getUser(socket.id);
        const receptor = getUser(to);
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }

        //disable self private message
        if (user.id === receptor.id) {
            io.to(user.id).emit('message', generateMessage('Admin', 'Self private messages are disabled!'));
            return callback();
        }

        //send message to emisor and receptor
        io.to(to).emit('privateMessage', generateMessage('From: ' + user.username, message));
        io.to(socket.id).emit('privateMessage', generateMessage('To: ' + receptor.username, message));
        callback();
    });

    //location message
    socket.on('sendLocation', ({ latitude, longitude }, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `http://google.com/maps?q=${latitude},${longitude}`));
        callback();
    });

    //active rooms
    socket.on('getRooms', () => {
        socket.emit('sendRooms', getRooms());
    });

    //socket disconnect
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left`));

            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

//SERVER INIT
server.listen(port, () => console.log(`App listen on port ${port}`));