var networkthingy = require("Network-manager.js");
var express = require("express");
var path = require('path');
var socket = io();
var formy = document.getElementById('username');

//inside the button click we need this
//socket.emit('sendAttack', message.value);

function giveUsername(){
  socket.emit('Login', formy.innerText);

}

socket.on('sendUse', function(msg){

  //does this just send it back to the backend server?
});