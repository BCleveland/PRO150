var socket = io();

//inside the button click we need this
//socket.emit('sendAttack', message.value);
let isGame = false;
let thisPlayerName = null;
let currentGameState = null;
let topX = 125;
let topY = 0;
let leftX = 25;
let leftY = 50;
let rightX = 225;
let rightY = 50;
let bottomX = 125;
let bottomY = 100;

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
  changeButtonNames();
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
        var heck = (j+currentGameState.fields[i].leadIndex) % 4;
        console.log(heck);
        console.log(currentGameState.fields[i].chars[heck].imageUrl);
        let profileImage = null;
        switch(j){
          case 0:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, rightX, rightY, 50, 50);
                console.log("boi");
            }
            break;
          case 1:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, bottomX, bottomY, 50, 50);
                console.log("do i");
            }
            break;
          case 2:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, leftX, leftY, 50, 50);
                console.log("hate");
            }
            break;
          case 3:
            profileImage = new Image();
            profileImage.src = currentGameState.fields[i].chars[heck].imageUrl;
            profileImage.onload = () =>{
                context.drawImage(profileImage, topX, topY, 50, 50);
                console.log("life");
            }
            break;
        }
      }
    }
  }
}

function changeButtonNames(){
  for(let i = 0; i < 2; i++){
    if(currentGameState.fields[i].ownerUsername === thisPlayerName){
      for(let j = 0; j < currentGameState.fields[i].chars[currentGameState.fields[i].leadIndex].moves.length; j++){
        document.getElementById(`move${j+1}`).innerHTML = currentGameState.fields[i].chars[currentGameState.fields[i].leadIndex].moves[j].Name;
      }
    }
  }
}