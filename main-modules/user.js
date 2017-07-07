// Load dependencies
var avatar = require('./avatar');

// Exported values
exports.getAvatar = getAvatar;

function getAvatar(req, res) {
  res.send({
    message: 'Avatar fetched',
    data: avatar.getNewAvatar(),
    status: true
  });
}
