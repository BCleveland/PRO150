var socket = io();

//inside the button click we need this
//socket.emit('sendAttack', message.value);

function giveUsername(){
  var formy = document.getElementById('username');
  socket.emit('login', formy.value);
  return false;
}

//when the game begins, this is called
socket.on('gameStart', function(gameState){
  console.log(gameState);
});