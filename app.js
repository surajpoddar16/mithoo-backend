// Environment Setup
process.env.NODE_CONFIG_DIR = __dirname + '/config';

var applicableEnvs = [
    'production'
    ,'development'
    ,'test'
];

if (applicableEnvs.indexOf(process.env.NODE_ENV) === -1) {
    console.log('Please select a valid environment');
    applicableEnvs.forEach(function(env) {
        console.log('-- ' + env);
    });
    return;
}

// Load Dependencies
var express = require('express');
var app = express();
var config = require('config');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var clientRoutes = require('./routes/client');


// View engine setup
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

// Using body parser to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Using morgan to log requests
app.use(morgan('combined'));

// Route Handler
app.use('/', clientRoutes);

// Serve static files from public folder
app.use('/public', express.static('public'));

var server = app.listen(process.env.PORT || config.get('port'))
console.log("Application listening on port " + config.get('port'));

exports.app = app;
exports.server = server;
