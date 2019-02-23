//Manages the connection and disconnection of players, as well as input and output

//externals
const Player = require('./game-objects/player');
var db = require('./database.js');

//An array of all of the player objects
var players = [];

var testUsernames = ["Grulk", "Zoran", "Halhatatlan", "Umbra"];
var nextTestUsername = 0;

exports.onConnect = function(socket){
    var username = testUsernames[nextTestUsername];
    nextTestUsername++;
    nextTestUsername %= 4;

    db.loadPlayer(username, onPlayerLoaded, socket);

    console.log('Player ' + username + ' connected.');
}

const onPlayerLoaded = function(playerSchema, socket){
    let player = new Player(playerSchema, socket);
    player.onJoin();
    players.push(player);
    socket.on('input', function(input){
        player.onInput(input);
        socket.emit('GameState', player.getVisual());
    });
    socket.on('disconnect', function(){
        onPlayerDisconnect(player);
    });

    console.log('Player ' + player.username + ' loaded.');
}

const onPlayerDisconnect = function(player){
    players = players.filter(function(p){
        return p.username !== player.username;
    });
    console.log('Player ' + player.username + ' disconnected.');
    
    pSaveData = {
        username: player.username,
        playerLevel: player.playerLevel,
        X:player.x,
        Y:player.y
    };
    db.savePlayer(pSaveData)
}