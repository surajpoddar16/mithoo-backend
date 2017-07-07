// Load dependencies
var socketIO = require('socket.io');
var utils = require('../main-modules/utils');

// exported values
module.exports = SocketManager;

function SocketManager(server) {
  this.io = socketIO.listen(server);
  this.io.on('connection', this.onConnection.bind(this));
}

SocketManager.prototype.onConnection = function(socket) {
  var self = this;
  socket.on('message', function(payload) {
    self.onMessage(socket, payload);
  });
};

SocketManager.prototype.onMessage = function(socket, payload) {
  var recipient = payload.recipient;
  var message = payload.message;

  this.simulateReply(socket, recipient, message);
};

SocketManager.prototype.simulateReply = function(socket, sender, message) {
  var self = this;
  var delay = 1000 * (Math.floor(Math.random() * 3) + 2);
  console.log(delay);
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
      message: utils.transformMessage(message)
    });
  }, delay);
};
