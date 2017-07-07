var fs = require('fs');
var avatar = require('./avatar');
var path = require('path');

function generateFriends(count) {
  console.log('Creating friends list');

  var friends = [];
  for (var i = 0; i < count; i++) {
    var friendAvatar = avatar.getNewAvatar();

    friends.push({
      uuid: i,
      avatar: friendAvatar
    });
  }

  var filePath = path.join(__dirname, '../data/friends.json');

  fs.writeFile(filePath, JSON.stringify(friends), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log('file saved');
  });
}

generateFriends(5);
