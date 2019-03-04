const Attack = require('./attacks/attack.js');
const Action = require('./objects/action.js');
const Character = require('./objects/character.js');
const Field = require('./objects/field.js');

/*

actions contains:
the move being used
priority if exists
caster

*/

let p1 = [
    new Character('A', 300),
    new Character('B', 300),
    new Character('C', 300),
    new Character('D', 300),
];

let p2 = [
    new Character('E', 300),
    new Character('F', 300),
    new Character('G', 300),
    new Character('H', 300),
];

let fields = [new Field(p1, 'Alpha'), new Field(p2, 'Beta')];

let act = [
    new Action(new Attack(10, 10, 10, 'physical'), 0, p1[1], 0),
    new Action(new Attack(5, 5, 5, 'magical'), 1, p2[1], 1)
];

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
}



exports.runTestTurn = () =>{
    runTurn(act);
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