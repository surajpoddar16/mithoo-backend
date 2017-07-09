// Load dependencies
var express = require('express');
var path = require('path');
var router = express.Router();
var user = require('../main-modules/user');

// Default response headers
router.use('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Route definations
router.get('/', (req, res) => {
  res.sendFile(path.normalize(__dirname + '/../views/index.html'));
});

router.get('/user/avatar', user.getAvatar);
router.get('/user/friends', user.getFriends);

// Exported values
module.exports = router;
