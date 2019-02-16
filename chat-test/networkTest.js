var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('myForm');
var message = document.getElementById('m');
form.onsubmit = (function(e){ 
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', message.value);
    message.value = '';
    return false;
});

socket.on('chat message', function(msg){
    messages.append('<li>' + msg + '</li>');
  });