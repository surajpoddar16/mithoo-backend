// Load dependencies
var moniker = require('moniker');
var path = require('path');

// Exported values
exports.getNewAvatar = getNewAvatar;

// Definations
function getNewAvatar() {
  return new Avatar().get();
}

function Avatar() {
  this.name = moniker.choose();
  this.profileImage = path.join(__dirname, '../public/images/avatar.png');
}

Avatar.prototype.get = function() {
  return {
    name: this.name,
    profileImage: this.profileImage
  };
}
