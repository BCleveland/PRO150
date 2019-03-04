const express = require('express'),
    path = require('path'),
    routes = require('./routes.js');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var network_manager = require('./network-manager.js');
io.on('connection', network_manager.onConnect);

app.use(express.static(path.join(__dirname + '/../game')));

app.get('/', routes.index);

let combatManagre = require('./combat-manager.js');

combatManagre.runTestTurn();

server.listen(3000);