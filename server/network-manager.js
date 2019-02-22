//Manages the connection and disconnection of players, as well as input and output

//externals
var pCtor = require('./player.js');

//An array of all of the player objects
var players = [];

exports.onConnect = function(socket){
    var player = pCtor.Player();
    player.onJoin();
    players.push(player);
    socket.on('input', player.onInput);
    socket.on('disconnect', function(){
        players = players.filter(function(p){
            return p.playerId !== player.playerId;
        });
        console.log(players);
    });
}