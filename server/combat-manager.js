const Attack = require('./attacks/attack.js').default;

/*

actions contains:
the move being used
priority if exists
caster

*/

calculateTurn = (actions) =>{
    let firstMove = getFirstMove(actions);
    let secondMove = (firstMove === 0) ? 1 : 0;

    actions[firstMove].use();
    actions[secondMove].use();
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

exports.UseMoveOnTarget = (user, attack, target) =>{
    let roll = getRoll(attack);
    let rawDamage = (roll*5)+attack.baseDamage;
    let defenceMod = 0;
    if(attack.attackType === "physical"){
        defenceMod = 1 + Math.log10(user.attack/target.defence);
    }
    else{
        defenceMod = 1 + Math.log10(user.attack/target.spDefence);
    }
    let damageToDeal = rawDamage * defenceMod;
    console.log(damageToDeal);
}

function getRoll(attack){
    let totalRoll = 0;
    for(let j = 0; j < attack.dieCount; j++){
        totalRoll += Math.floor(Math.random()*attack.dieSize)+1;
    }
    console.log(attack.dieCount + 'd' + attack.dieSize + ' rolled ' + totalRoll);
    return totalRoll;
}