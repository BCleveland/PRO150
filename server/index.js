const express = require('express'),
    path = require('path'),
    routes = require('./routes.js');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log(msg);
        io.emit('chat message', msg);
    });
  });

app.use(express.static(path.join(__dirname + '/../chat-test')));

app.get('/', routes.index);

server.listen(3000);