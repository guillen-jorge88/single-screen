// var queryDb = require('../data/querys')
var socket_io = require('socket.io');
var io = socket_io();
var socketio = {};
socketio.io = io;
var users = [];


io.on('connection', function(socket) {
    console.log('A user connected');
    console.log(socket.id);

    socket.on('join', function(user) {
        queryDb.inserUserDb({ socketId: socket.id, uuid: user.uuid, username: user.username });
        userJoined(user.username, true);
        let clients = findAllUsers();
        io.emit('user_joined', { 'username': user.username, clients: clients });
    });

    socket.on('typing', function(msg) {
        io.emit('typing', { 'message': msg.message, 'username': msg.username });
    });

    socket.on('new_message', function(msg) {
        let user = queryDb.findUserById('users', socket.id);
        let newMsg = {
            user: user,
            message: msg.message,
            date: Date.now()
        }
        queryDb.inserMessageDb(newMsg);
        io.emit('chat_message', { 'message': msg.message, 'username': msg.username });
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        console.log(socket.id);
        queryDb.removeUserDb(socket.id);
        io.emit('user disconnected', { 'username': socket.username });
    });


});

function userJoined(username, isConnected) {
    let clients = queryDb.findAllUsers();
    io.emit('user_joined', { 'username': username, isConnected: isConnected, clients: clients });
}

module.exports = socketio;