// Load dependencies
var express = require('express');
var path = require('path');
var router = express.Router();

// Route definations
router.get('/', (req, res) => {
  res.sendFile(path.normalize(__dirname + '/../views/index.html'));
});

// Exported values
module.exports = router;
