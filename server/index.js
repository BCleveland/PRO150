const express = require('express'),
    path = require('path'),
    routes = require('./routes.js');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('input', function(input){
        console.log(input);
    });
  });

app.use(express.static(path.join(__dirname + '/../game')));

app.get('/', routes.index);

server.listen(3000);