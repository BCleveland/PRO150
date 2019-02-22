
exports.Player = function(schema){
    var player = {
        //general gameobject variables
        x:schema.X,
        y:schema.Y,
        //object variables
        username:schema.username,
        playerLevel:schema.playerLevel,
        //functions
        onJoin:function(){
        },
        onInput:function(input){
            //console.log(input);
        }
    };
    return player;
}