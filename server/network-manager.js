//Manages the connection and disconnection of players, as well as input and output

//externals
var db = require('./database.js');
var Player = require('./objects/player.js');
var combatmanager = require('./combat-manager.js');

//An array of all of the player objects
var players = [];

exports.onConnect = socket =>{
    //Hook up the sockets, but the player isn't "connected" until they enter a username
    let p = new Player(socket);
    console.log("A player has connected. Waiting for username");
    players.push(p);
}

exports.startGame = () =>{
    console.log("Game is starting.");
    let gameState = combatmanager.getGameState();
    players[0].socket.emit('gameStart', gameState);
    players[1].socket.emit('gameStart', gameState);
    //now that the game has started, the server will wait until until both players enter something
}

exports.updateClients = () =>{
    console.log("Next turn starting");
    let gameState = combatmanager.getGameState();
    players[0].socket.emit('gameUpdate', gameState);
    players[1].socket.emit('gameUpdate', gameState);
}