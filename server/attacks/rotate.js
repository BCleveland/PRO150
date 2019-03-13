const Attack = require('./attack.js');

module.exports = class Rotate{
    constructor(direction){
        console.log("rotate action created");
        this.direction = direction;
    }
    useAttack(user, target){
        //In this case, user is the player and target is the field itself
        console.log("rotate action used");
        target.rotate(this.direction);
    }
}