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
  this.profileImage = `/public/images/avatar_${this.getRandomIndex()}.png`;
}

Avatar.prototype.get = function() {
  return {
    name: this.name,
    profileImage: this.profileImage
  };
}

Avatar.prototype.getRandomIndex = function() {
  return Math.floor(4 * Math.random()) + 1;
}
