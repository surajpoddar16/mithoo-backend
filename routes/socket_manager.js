// Load dependencies
var socketIO = require('socket.io');
var utils = require('../main-modules/utils');
var fs = require('fs');
var path = require('path');

// exported values
module.exports = SocketManager;

function SocketManager(server) {
  this.io = socketIO.listen(server);
  this.io.on('connection', this.onConnection.bind(this));
}

SocketManager.prototype.welcomeMessage = 'Welcome to Mithoo!!';

SocketManager.prototype.onConnection = function(socket) {
  var self = this;
  socket.on('message', function(payload) {
    self.onMessage(socket, payload);
  });

  socket.on('welcome_ping', function(payload) {
    self.onWelcomePing(socket);
  });
};

SocketManager.prototype.onMessage = function(socket, payload) {
  var recipient = payload.recipient;
  var message = payload.message;

  this.simulateReply(socket, recipient, message);
};

SocketManager.prototype.onWelcomePing = function(socket) {
  var self = this;

  getWelcomeSender(function(sender) {
    socket.emit('message', {
      sender: sender,
      message: self.welcomeMessage,
      date: new Date(),
      seen: 0
    });
  });
};


SocketManager.prototype.simulateReply = function(socket, sender, message) {
  var self = this;
  var delay = 1000 * (Math.floor(Math.random() * 3) + 2);
  var typeDelay = 500;

  var typingInterval = setInterval(function() {
    socket.emit('typing', {
      sender: sender
    });
  }, typeDelay);

  var replyTimeout = setTimeout(function() {
    clearInterval(typingInterval);
    socket.emit('message', {
      sender: sender,
      message: utils.transformMessage(message),
      date: new Date(),
      seen: 0
    });
  }, delay);
};

var welcomeSender;

getWelcomeSender = function(callback) {
  if (typeof welcomeSender !== 'undefined') {
    return callback(welcomeSender);
  }

  var filePath = path.join(__dirname, '../data/friends.json');
  fs.readFile(filePath, function read(err, data) {
    if (err) {
      return undefined;
    }

    welcomeSender = (JSON.parse(data))[0];
    return callback(welcomeSender);
  });
}
