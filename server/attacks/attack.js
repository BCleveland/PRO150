module.exports = class Attack{
    constructor(baseDamage, dieCount, dieSize, attackType){
        this.baseDamage = baseDamage;
        this.dieCount = dieCount;
        this.dieSize = dieSize;
        this.attackType = attackType;
    }
    useAttack(user, target){
        let roll = this.getRoll();
        let rawDamage = (roll*5)+this.baseDamage;
        let defenceMod = 0;
        if(this.attackType === "physical"){
            defenceMod = 1 + Math.log10(user.attack/target.defence);
        }
        else{
            defenceMod = 1 + Math.log10(user.attack/target.spDefence);
        }
        let damageToDeal = rawDamage * defenceMod;
        target.dealDamage(damageToDeal);
    }
    getRoll(){
        let totalRoll = 0;
        for(let j = 0; j < this.dieCount; j++){
            totalRoll += Math.floor(Math.random()*this.dieSize)+1;
        }
        console.log(this.dieCount + 'd' + this.dieSize + ' rolled ' + totalRoll);
        return totalRoll;
    }
}