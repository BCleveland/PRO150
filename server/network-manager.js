//Manages the connection and disconnection of players, as well as input and output

//An array of all of the player objects
var players = [];

exports.onConnect = function(socket){
    var player = {
        onInput:function(input){
            console.log(input);
        },
        onDisconnect:function(){
            players.filter(function(test){
                return test !== this;
            });
            console.log(players);
        }
    };
    players.push(player);
    socket.on('input', player.onInput);
    socket.on('disconnect', player.onDisconnect);
}