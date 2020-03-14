var socket_io = require('socket.io');
var io = socket_io();
var socketio = {};
var users = [];

socketio.io = io;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (user) => {
        socket.username = user.username;
        users.push(socket.username);
        io.emit('user joined', { username: user.username, users: users });
    });

    socket.on('integrator_msg', (msg) => {
        console.log(msg);
        //io.emit('');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        users.splice(users.indexOf(socket.username), 1);
        io.emit('user disconnected', { username: socket.username });
    });
});

module.exports = socketio;