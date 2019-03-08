var socket = io();

//inside the button click we need this
//socket.emit('sendAttack', message.value);
let isGame = false;

function giveUsername(){
  var formy = document.getElementById('username');
  socket.emit('login', formy.value);
  toggle();
  return false;
}

//when the game begins, this is called
socket.on('gameStart', function(gameState){
  console.log(gameState);
});

function spin(num){
  socket.emit('input', num);
}

function toggle(){
  console.log("whoooooooo");
  if(isGame){
    document.getElementById('game').style.display = 'none';
    document.getElementById('username').style.display = 'block';
  }
  else{
    console.log("howdy y'all");
    document.getElementById('username').style.display = 'none';
    document.getElementById('game').style.display = 'block';
  }

  isGame = !isGame;
  console.log(isGame);
}