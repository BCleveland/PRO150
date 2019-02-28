const Attack = require('./attacks/attack.js').default;



exports.UseMoveOnTarget = function(user, attack, target){
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