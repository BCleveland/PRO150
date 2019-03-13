const Attack = require('./attacks/attack.js');
const Action = require('./objects/action.js');
const Character = require('./objects/character.js');
const Field = require('./objects/field.js');
const Rotate = require('./attacks/rotate.js');

const networkmanager = require('./network-manager');
const db = require('./database.js');

/*

actions contains:
the move being used
priority if exists
caster

*/

//this will only contain players who have loaded their data already
let players = [];

let fields = [];

///Given a player objects, loads its field object into it
exports.loadPlayerData = player =>{
    db.getPlayerTeam(player, onCharactersLoaded);
}

onCharactersLoaded = (player, characters)=>{
    let chars = [];
    for(let j = 0; j < characters.length; j++){
        chars.push(new Character(characters[j]));
    }
    console.log(chars);
    player.field = new Field(chars, player.username);
    player.pId = players.length;
    players.push(player);
    fields.push(player.field);

    //if both players are loaded in
    if(players.length == 2){
        networkmanager.startGame();
    }
}

exports.onPlayerInput = (player, input) =>{
    //Figure out the move to use here
    console.log(input);
    if(input === "SpinRight" || input === "SpinLeft"){
        let dir = input === "SpinRight" ? 1 : -1;
        var attack = new Rotate(dir);
        var priority = 1;
        var caster = player.field.getLead();
        console.log("here1");
    }
    else{
        var attack = new Attack(input);
        var priority = 0;
        var caster = player.field.getLead();
        console.log("here 2");
    }
    console.log(attack);
    player.currentAction = new Action(attack, priority, caster, player.pId);

    checkIfTurnReady();
}

checkIfTurnReady = () =>{
    if(players[0].currentAction != null && players[1].currentAction != null){
        runTurn([players[0].currentAction, players[1].currentAction]);
    }
}

/*
Once both actions are input,
run this function, calculate the backend
sent the data to clients to display/animate
*/
runTurn = (actions) =>{
    let firstMove = getFirstMove(actions);
    let secondMove = (firstMove === 0) ? 1 : 0;

    actions[firstMove].use(fields);
    actions[secondMove].use(fields);

    players[0].currentAction = null;
    players[1].currentAction = null;

    networkmanager.updateClients();
}


getFirstMove = (actions) =>{
    //if one of the moves has a higher priority, it goes first
    let firstMove = -1;
    if(actions[0].priority > actions[1].priority){
        firstMove = 0;
    }
    else if(actions[1].priority > actions[0].priority){
        firstMove = 1;
    }

    //if both moves were tied in priority, go on the caster's speeds
    if(firstMove === -1){
        if(actions[0].caster.effectiveSpeed > actions[1].caster.effectiveSpeed){
            firstMove = 0;
        }
        else if(actions[1].caster.effectiveSpeed > actions[0].caster.effectiveSpeed){
            firstMove = 1;
        }

        //If speeds are tied and priority is tied, a random person goes first
        if(firstMove === -1){
            firstMove = Math.round(Math.random());
        }
    }
    return firstMove;
}


exports.getGameState = () =>{
    return {
        fields:fields
    };
}