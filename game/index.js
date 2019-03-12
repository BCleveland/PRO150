var socket = io();

//inside the button click we need this
//socket.emit('sendAttack', message.value);
let isGame = false;
let thisPlayerName = null;
let currentGameState = null;
let topX = 50;
let topY = 25;
let leftX = 25;
let leftY = 50;
let rightX = 75;
let rightY = 50;
let bottomX = 50;
let bottomY = 75;

function giveUsername(){
  var formy = document.getElementById('usernameFormy');
  socket.emit('login', formy.value);
  thisPlayerName = formy.value;
  return false;
}

function turnInput(event){
  console.log(event);
  let response = null;
  if(event === 5) response = "SpinRight";
  else if(event === -5) response = "SpinLeft";
  else{
    let currentPlayer = null;
    currentGameState.fields.forEach(element => {
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
  toggle();
  drawFields();
});

socket.on('gameUpdate', function(gameState){
  console.log(gameState);
  currentGameState = gameState;
  drawFields();
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

function drawFields(){
  if(currentGameState !== null){
    for(let i = 0; i < currentGameState.fields.length; i++){
      let canvas = document.getElementById(`field${i+1}`);
      let context = canvas.getContext('2d');
      for(let j = 0; j < currentGameState.fields[i].chars.length; j++){
        var heck = j+currentGameState.fields[i].leadIndex % 4;
        switch(j){
          case 0:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, rightX, rightY, 100, 100);
            }
            break;
          case 1:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, bottomX, bottomY, 100, 100);
            }
            break;
          case 2:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, leftX, leftY, 100, 100);
            }
            break;
          case 3:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, topX, topY, 100, 100);
            }
            break;
        }
      }
    }
  }
}