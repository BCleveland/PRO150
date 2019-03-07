let combatmanager = require('../combat-manager');

//Manages a player's connection and units
module.exports = class Player{
    constructor(socket){
        this.socket = socket;
        socket.on("login", this.defineUsername);
        socket.on("input", this.onInput);
    }
    defineUsername(username){
        this.username = username;
        combatmanager.loadPlayerData(this);
    }
    onInput(input){
        combatmanager.onPlayerInput(this, input);
    }
}