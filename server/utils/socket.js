const userToSocket = {};
const socketToUser = {};

function addUser(userId, socketId) {
    if (!userToSocket[userId]) {
        userToSocket[userId] = socketId;
        socketToUser[socketId] = userId;
    }
}

function removeUser(socketId) {
    const userId = socketToUser[socketId];
    if (userId) {
        delete userToSocket[userId];
        delete socketToUser[socketId];
    }
}

function getReceiver(receiverId) {
    return userToSocket[receiverId];
}

module.exports = { addUser, removeUser, getReceiver };
