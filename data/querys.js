var path = require('path');

/**
 * Data Base
 */
var low = require('lowdb');
var storage = require('lowdb/adapters/FileSync');
var adapter = new storage(path.join(__dirname, '../../data/socket-db.json'));

var db = low(adapter);

dbStatus = db.getState();

if (!dbStatus.length) {
    db.defaults({ users: [], messages: [], length: 2 }).write();
    console.log('create db...');
};


function inserUserDb(newUser) {
    let userDB = findUserById('users', newUser.id);
    if (!userDB) {
        db.get('users')
            .push(newUser)
            .write();
    }
}

function removeUserDb(socketId) {
    db.get('users')
        .remove({ socketId: socketId })
        .write();
}

function findAllUsers() {
    let users = db.get('users')
        .value();
    return users;
}

function findUserById(table, userId) {
    let user = db.get(table)
        .find({ socketId: userId })
        .value();

    return user;
}

function inserMessageDb(newMsg) {
    db.get('messages')
        .push(newMsg)
        .write();
}


module.exports = {
    inserUserDb: inserUserDb,
    removeUserDb: removeUserDb,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    inserMessageDb: inserMessageDb
};