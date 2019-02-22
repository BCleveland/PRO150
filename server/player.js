
var nextPlayerId = 0;

exports.Player = function(){
    var player = {
        //general gameobject variables

        //object variables
        playerId:nextPlayerId,

        //functions
        onJoin:function(){
        },
        onInput:function(input){
            //console.log(input);
        }
    };

    nextPlayerId++;

    return player;
}