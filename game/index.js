var socket = io();

//inside the button click we need this
//socket.emit('sendAttack', message.value);
let isGame = false;
let thisPlayerName = null;
let currentGameState = null;

function giveUsername(){
  var formy = document.getElementById('usernameFormy');
  socket.emit('login', formy.value);
  thisPlayerName = formy.value;
  toggle();
  return false;
}

function turnInput(event){
  console.log(event);
  let response = null;
  if(event === 5) response = "SpinRight";
  else if(event === -5) response = "SpinLeft";
  else{
    let currentPlayer = null;
    currentGameState.forEach(element => {
      if(element.ownerUsername === thisPlayerName){
        response = element.chars[element.leadIndex].moves[event];
      }
    });
  }

  socket.emit('input', response);
}

//when the game begins, this is called
socket.on('gameStart', function(gameState){
  console.log(gameState);
  currentGameState = gameState;
});

socket.on('gameUpdate', function(gameState){
  console.log(gameState);
  currentGameState = gameState;
})

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