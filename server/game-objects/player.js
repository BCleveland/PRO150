const GameObject = require("./gameobject");

module.exports = class Player extends GameObject{
    constructor(schema, socket){
        super(schema.X, schema.Y, 5, '#fff');
        //object variables
        this.username = schema.username;
        this.playerLevel = schema.playerLevel;
        this.socket = socket;
        console.log(socket);
    }
    onJoin(){

    }
    onInput(input){
        //console.log(input);
        if(input.left){
            this.x -= 5 * input.dt;
        }
        if(input.right){
            this.x += 5 * input.dt;
        }
        if(input.up){
            this.y += 5 * input.dt;
        }
        if(input.down){
            this.y -= 5 * input.dt;
        }
    }
}