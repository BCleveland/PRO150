//Manages the connection and disconnection of players, as well as input and output

//externals
var db = require('./database.js');
var Player = require('./objects/character.js');

//An array of all of the player objects
var players = [];

exports.onConnect = function(socket){
    let p = new Player(socket);
    socket.on('input', p.onInput);
    if(players.length === 2){
        //start the game
        startGame();
    }

}

function startGame(){
    let gameState = {};
    players[0].socket.emit('gameStart', gameState);
    players[1].socket.emit('gameStart', gameState);
}