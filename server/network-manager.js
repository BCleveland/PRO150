//Manages the connection and disconnection of players, as well as input and output

//externals
var pCtor = require('./player.js');
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

    console.log('Player ' + player.username + ' connected.');
}

const onPlayerLoaded = function(playerSchema, socket){
    var player = pCtor.Player(playerSchema);
    player.onJoin();
    players.push(player);
    socket.on('input', player.onInput);
    socket.on('disconnect', function(){
        players = players.filter(function(p){
            return p.playerId !== player.playerId;
        });
        console.log('Player ' + player.username + ' disconnected.');
    });

    console.log('Player ' + player.username + ' loaded.');
}