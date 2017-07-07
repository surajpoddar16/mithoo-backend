// Load dependencies
var express = require('express');
var path = require('path');
var router = express.Router();
var user = require('../main-modules/user');

// Route definations
router.get('/', (req, res) => {
  res.sendFile(path.normalize(__dirname + '/../views/index.html'));
});

router.get('/user/avatar', user.getAvatar);
router.get('/user/friends', user.getFriends);

// Exported values
module.exports = router;
