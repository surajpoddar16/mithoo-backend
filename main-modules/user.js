// Load dependencies
var fs = require('fs');
var path = require('path');
var avatar = require('./avatar');
var errorHandler = require('./error_handler');

// Exported values
exports.getAvatar = getAvatar;
exports.getFriends = getFriends;

// Definations
var friends = undefined;

function getAvatar(req, res) {
  res.send({
    message: 'Avatar fetched',
    data: avatar.getNewAvatar(),
    status: true
  });
}

function getFriends(req, res) {
  var search = req.query.search || "";
  if (typeof friends !== 'undefined') {
    onSuccess(friends, res);
    return;
  }

  var filePath = path.join(__dirname, '../data/friends.json');
  fs.readFile(filePath, function read(err, data) {
    if (err) {
      errorHandler.internalServerError(res, err);
      return;
    }

    friends = JSON.parse(data);
    onSuccess(friends, res);
  });

  function onSuccess(friends, res) {
    res.send({
      message: 'Friends list fetched',
      data: friends.filter((item) => { return item.avatar.name.includes(search) }),
      status: true
    });
  }
}
