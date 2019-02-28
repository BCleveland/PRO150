module.exports = class Attack{
    constructor(baseDamage, dieCount, dieSize, attackType){
        this.baseDamage = baseDamage;
        this.dieCount = dieCount;
        this.dieSize = dieSize;
        this.attackType = attackType;
    }
}